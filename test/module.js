// Node modules.
const { extname } = require(`path`);
// Dependency modules.
const test = require(`ava`);
// Custom module.
const Rename = require(`../library`);

test(`rename`, async function(t) {
	// Create dummy files.
	const files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}];
	
	// Create module options.
	const options = {
		engine: function(path) {
			return `c`.concat(extname(path));
		},
		patterns: `*.md`
	};
	
	// Expected outcome.
	const filesOutcome = [{
		path: `a.txt`
	}, {
		path: `c.md`
	}];
	
	// Test module.
	const rename = Rename(options);
	await rename({}, files);
	// Compare files.
	t.deepEqual(files, filesOutcome);
});