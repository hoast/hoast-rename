// If debug available require it.
let debug; try { debug = require(`debug`)(`hoast-rename`); } catch(error) { debug = function() {}; }
// Node modules.
const assert = require(`assert`);
// Dependency modules.
const parse = require(`planckmatch/parse`),
	match = require(`planckmatch/match`);

/**
 * Validates the module options.
 * @param {Object} options The options.
 */
const validateOptions = function(options) {
	assert(
		typeof(options) === `object`,
		`hoast-rename: options must be set and of type object.`
	);
	
	assert(
		typeof(options.engine) === `function`,
		`hoast-rename: engine must be specified and of type function.`
	);
	
	if (options.patterns) {
		assert(
			typeof(options.patterns) === `string` || (Array.isArray(options.patterns) && options.patterns.length > 0 && typeof(options.patterns[0] === `string`)),
			`hoast-rename: patterns must be of type string or an array of string.`
		);
	}
	if (options.patternOptions) {
		assert(
			typeof(options.patternOptions) === `object`,
			`hoast-rename: patternOptions must be of type object.`
		);
		if (options.patternOptions.all) {
			assert(
				typeof(options.patternOptions.all) === `boolean`,
				`hoast-rename: patternOptions.all must be of type boolean.`
			);
		}
	}
};

/**
 * Check if expressions match with the given value.
 * @param {String} value The string to match with the expressions.
 * @param {RegExps|Array} expressions The regular expressions to match with.
 * @param {Boolean} all Whether all patterns need to match.
 */
const isMatch = function(value, expressions, all) {
	// If no expressions return early as valid.
	if (!expressions) {
		return true;
	}
	
	const result = match(value, expressions);
	
	// If results is an array.
	if (Array.isArray(result)) {
		// Check whether all or just any will result in a match, and return the outcome.
		return all ? !result.includes(false) : result.includes(true);
	}
	
	// Otherwise result is a boolean and can be returned directly.
	return result;
};

/**
 * Rename the path of files.
 * @param {Object} options The module options.
 */
module.exports = function(options) {
	debug(`Initializing module.`);
	
	validateOptions(options);
	debug(`Validated options.`);
	options = Object.assign({
		patternOptions: {}
	}, options);
	
	const mod = async function(hoast, files) {
		debug(`Running module.`);
		await Promise.all(
			files.map(async function(file) {
				debug(`Processing file '${file.path}'.`);
				
				// Check if read module has been used.
				assert(
					file.content !== null,
					`hoast-rename: No content found on file, read module needs to be called before this.`
				);
				
				// Check against glob patterns.
				if (!isMatch(file.path, this.expressions, options.patternOptions.all)) {
					debug(`File path not valid for processing.`);
					return;
				}
				
				debug(`File path matches pattern.`);
				
				// Call custom function.
				file.path = await options.engine(file.path);
				assert(
					typeof(file.path) === `string`,
					`hoast-rename: file path must be of type string.`
				);
				debug(`File path renamed to ${file.path}.`);
			}, mod)
		);
	};
	
	mod.before = function() {
		debug(`Running module before.`);
		
		// Parse glob patterns into regular expressions.
		if (options.patterns) {
			this.expressions = parse(options.patterns, options.patternOptions, true);
			debug(`Patterns parsed into expressions: ${this.expressions}.`);
		}
	};
	
	return mod;
};