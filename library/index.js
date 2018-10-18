// If debug available require it.
let debug; try { debug = require(`debug`)(`hoast-rename`); } catch(error) { debug = function() {}; }

/**
 * Rename the path of files.
 * @param {Object} options The module options.
 */
module.exports = function(options) {
	debug(`Initializing module.`);
	
	options = Object.assign({
		patternOptions: {}
	}, options);
	
	const mod = async function(hoast, files) {
		debug(`Running module.`);
		await Promise.all(
			files.map(async function(file) {
				debug(`Processing file '${file.path}'.`);
				
				// Check if read module has been used.
				if (file.content === null) {
					debug(`File content not set, read module needs to be called before this.`);
					return;
				}
				
				// Check against glob patterns.
				if (!hoast.helper.match(file.path, this.expressions, options.patternOptions.all)) {
					debug(`File path not valid for processing.`);
					return;
				}
				
				debug(`File path matches pattern.`);
				
				// Call custom function.
				const temp = await options.engine(file.path);
				if (typeof(temp) !== `string`) {
					debug(`File path is not of type string, therefore it is ignored.`);
				}
				file.path = temp;
				debug(`File path renamed to ${file.path}.`);
			}, mod)
		);
	};
	
	mod.before = function(hoast) {
		// Parse glob patterns into regular expressions.
		if (options.patterns) {
			this.expressions = hoast.helper.parse(options.patterns, options.patternOptions, true);
			debug(`Patterns parsed into expressions: ${this.expressions}.`);
		}
	};
	
	return mod;
};