// Node modules.
const { extname } = require(`path`);
// Dependency modules.
const Hoast = require(`hoast`),
	test = require(`ava`);
// Custom module.
const Rename = require(`../library`);

/**
 * Emulates a simplified Hoast process for testing purposes.
 * @param {Object} options Hoast options.
 * @param {Function} mod Module function.
 * @param {Array of objects} files The files to process and return.
 */
const emulateHoast = async function(options, mod, files) {
	const hoast = Hoast(__dirname, options);
	
	if (mod.before) {
		await mod.before(hoast);
	}
	
	const temp = await mod(hoast, files);
	if (temp) {
		files = temp;
	}
	
	if (mod.after) {
		await mod.after(hoast);
	}
	
	return files;
};

test(`rename`, async function(t) {
	// Create dummy files.
	const files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}];
	
	// Expected outcome.
	const filesOutcome = [{
		path: `a.txt`
	}, {
		path: `c.md`
	}];
	
	// Test module.
	await emulateHoast({}, Rename({
		engine: function(path) {
			return `c`.concat(extname(path));
		},
		patterns: `*.md`
	}), files);
	// Compare files.
	t.deepEqual(files, filesOutcome);
});