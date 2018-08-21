<div align="center">
  <a title="Version master branch" href="https://github.com/hoast/hoast-rename#readme" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/package-json/v/hoast/hoast-rename.svg?label=master&style=flat-square"/>
  </a>
  <a title="Version npm package" href="https://npmjs.com/package/hoast-rename" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/v/hoast-rename.svg?label=npm&style=flat-square"/>
  </a>
  <a title="License agreement" href="https://github.com/hoast/hoast-rename/blob/master/LICENSE" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/license/hoast/hoast-rename.svg?style=flat-square"/>
  </a>
  <a title="Travis-ci build statis" href="https://travis-ci.org/hoast/hoast-rename" target="_blank" rel="noopener">
    <img src="https://img.shields.io/travis-ci/hoast/hoast-rename.svg?branch=master&style=flat-square"/>
  </a>
  <a title="Open issues on GitHub" href="https://github.com/hoast/hoast-rename/issues" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/issues/hoast/hoast-rename.svg?style=flat-square"/>
  </a>
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

* `patterns` **{Array|strings}**: A string or an array of strings which gets used to match files using glob patterns. See [nanomatch](https://github.com/micromatch/nanomatch#readme) for more details on the patterns.
	* Required: `no`

### Examples

**Cli**

Not compatible with the CLI tool as it requires a reference to a self written function.

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
    patterns: [
	  `**/*.markdown`
    ]
  }))
  .process();
```

> In the example only the markdown files with the `.markdown` extension are renamed to `.md`.

## License

[ISC license](https://github.com/hoast/hoast-rename/blob/master/LICENSE)