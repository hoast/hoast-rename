// Node modules.
const assert = require('assert');
// If debug available require it.
let debug; try { debug = require('debug')('hoast-rename'); } catch(error) { debug = function() {}; }
// Dependency modules.
const nanomatch = require('nanomatch');

/**
 * Validates the module options.
 * @param {Object} options The options.
 */
const validateOptions = function(options) {
	assert(typeof(options) === 'object', 'hoast-rename: options must be set and of type object.');
	assert(typeof(options.engine) === 'function', 'hoast-rename: engine must be specified and of type function.');
	if (options.patterns) {
		assert(Array.isArray(options.patterns) && options.patterns.length, 'hoast-rename: patterns must be an array of string.');
	}
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
		
	}, options);
	
	return async function(hoast, files) {
		debug(`Running module.`);
		return Promise.all(
			files.map(async function(file) {
				debug(`Processing file '${file.path}'.`);
				
				assert(file.content !== null, 'hoast-convert: No content found on file, read module needs to be called before this.');
				// Has to match patterns.
				if (options.patterns && options.patterns.length > 0 && !nanomatch.any(file.path, options.patterns)) {
					debug(`File not valid for processing.`);
					return resolve();
				}
				debug(`File path matches pattern.`);
				
				file.path = await options.engine(file.path);
				assert(typeof(file.path) === 'string', 'hoast-rename: file path must be of type string.');
				debug(`File path renamed.`);
			})
		);
	};
};