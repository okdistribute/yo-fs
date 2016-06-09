# yo-fs

A client-side modular, stream-friendly ui browser widget for navigating directories, built with [yo-yo](npmjs.org/yo-yo).

[![NPM](https://nodei.co/npm/yo-fs.png)](https://nodei.co/npm/yo-fs/)

## api

#### `yofs(path, entries, onclick)`

  * `path`: the directory or filename to display
  * `entries`: a list of entries with `name`, `size`, `modified`, `createReadStream`
  * `onclick`: fires when a folder, file, or back button is clicked.

## example

```js
var yofs = require('yo-fs')
var yo = require('yo-yo')

var onclick = function (event, entry) {
  console.log('i clicked', entry)
}

var el = yofs('/', entries, onclick)
document.body.appendChild(el)

var stream = //stream that gives me some data...

stream.on('data', function (entry) {
  entries.push(entry)
  yo.update(el, yofs('/', entries, onclick)) // dynamically updates the widget
}
```
