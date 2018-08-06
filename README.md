# Hoast-rename

Rename the path of files using a specified function.

> As the name suggest this is a [hoast](https://github.com/hoast/hoast#readme) module.

## Usage

Install [hoast-rename](https://npmjs.com/package/hoast-rename) using [npm](https://npmjs.com).

```
$ npm install hoast-rename
```

### Parameters

* `patterns` **{Array of strings}**: An array of string which gets used to match files using glob patterns. See [nanomatch](https://github.com/micromatch/nanomatch#readme) for more details on the patterns.
	* Required: `yes`

### Examples

**Cli**

Not compatible with the CLI tool as it requires a reference to a self written function.

**Script**

```javascript
const Hoast = require('hoast');
const read = Hoast.read,
      rename = require('hoast-rename');

Hoast(__dirname)
  .use(rename({
    engine: function(filePath) {
      return filePath.substr(0, filePath.lastIndexOf('.')).concat('md');
	},
    patterns: [
	  '**/*.markdown'
    ]
  }))
  .use(read())
  .process();
```

> In the example only the markdown files with the `.markdown` extension are renamed to `.md`.

## License

[ISC license](https://github.com/hoast/hoast-rename/blob/master/LICENSE)