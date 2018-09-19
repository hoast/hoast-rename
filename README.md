[![Version npm package](https://img.shields.io/npm/v/hoast-rename.svg?label=npm&style=flat-square)](https://npmjs.com/package/hoast-rename)
[![Version GitHub master branch](https://img.shields.io/github/package-json/v/hoast/hoast-rename.svg?label=github&style=flat-square)](https://github.com/hoast/hoast-rename#readme)
[![Version GitHub develop branch](https://img.shields.io/github/package-json/v/hoast/hoast-rename/develop.svg?label=github/develop&style=flat-square)](https://github.com/hoast/hoast-rename/tree/develop#readme)
[![License agreement](https://img.shields.io/github/license/hoast/hoast-rename.svg?style=flat-square)](https://github.com/hoast/hoast-rename/blob/master/LICENSE)
[![Travis-ci build status](https://img.shields.io/travis-ci/hoast/hoast-rename.svg?label=travis&branch=master&style=flat-square)](https://travis-ci.org/hoast/hoast-rename)
[![Open issues on GitHub](https://img.shields.io/github/issues/hoast/hoast-rename.svg?style=flat-square)](https://github.com/hoast/hoast-rename/issues)

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