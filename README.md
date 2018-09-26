<div align="center">
  
  [![npm package @latest](https://img.shields.io/npm/v/hoast-rename.svg?label=npm@latest&style=flat-square&maxAge=3600)](https://npmjs.com/package/hoast-rename)
  [![npm package @next](https://img.shields.io/npm/v/hoast-rename/next.svg?label=npm@next&style=flat-square&maxAge=3600)](https://npmjs.com/package/hoast-rename/v/next)
  
  [![Travis-ci status](https://img.shields.io/travis-ci/hoast/hoast-rename.svg?branch=master&label=test%20status&style=flat-square&maxAge=3600)](https://travis-ci.org/hoast/hoast-rename)
  [![CodeCov coverage](https://img.shields.io/codecov/c/github/hoast/hoast-rename/master.svg?label=test%20coverage&style=flat-square&maxAge=3600)](https://codecov.io/gh/hoast/hoast-rename)
  
  [![License agreement](https://img.shields.io/github/license/hoast/hoast-rename.svg?style=flat-square&maxAge=86400)](https://github.com/hoast/hoast-rename/blob/master/LICENSE)
  [![Open issues on GitHub](https://img.shields.io/github/issues/hoast/hoast-rename.svg?style=flat-square&maxAge=86400)](https://github.com/hoast/hoast-rename/issues)
  
</div>

# hoast-rename

Rename the path of files using a specified function.

> As the name suggest this is a [hoast](https://github.com/hoast/hoast#readme) module.

## Usage

Install [hoast-rename](https://npmjs.com/package/hoast-rename) using [npm](https://npmjs.com).

```
$ npm install hoast-rename
```

### Parameters

* `engine`: A function that processes the file path and returns the new one. The function should take one parameter the file path, which is of type `String`. Do note the function can be asynchronous or return a promise. The function needs the return the new content in the form of a string.
  * Type: `Function`
	* Required: `yes`
* `patterns`: Glob patterns to match file paths with. If the engine function is set it will only give the function any files matching the pattern.
  * Type: `String` or `Array of strings`
	* Required: `no`
* `patternOptions`: Options for the glob pattern matching. See [planckmatch options](https://github.com/redkenrok/node-planckmatch#options) for more details on the pattern options.
  * Type: `Object`
  * Default: `{}`
* `patternOptions.all`: This options is added to `patternOptions`, and determines whether all patterns need to match instead of only one.
  * Type: `Boolean`
  * Default: `false`

### Examples

**Cli**

Not compatible with the CLI tool as it requires a reference to a self specified function.

**Script**

```javascript
const Hoast = require(`hoast`);
const read = Hoast.read,
      rename = require(`hoast-rename`);

Hoast(__dirname)
  .use(read())
  .use(rename({
    engine: function(filePath) {
      return filePath.substr(0, filePath.lastIndexOf(`.`)).concat(`md`);
	  },
    patterns: `**/*.markdown`,
    patternOptions: {
      globstar: true
    }
  }))
  .process();
```

> In the example only the markdown files with the `.markdown` extension are renamed to `.md`.

## License

[ISC license](https://github.com/hoast/hoast-rename/blob/master/LICENSE)