# yo-fs

A client-side modular, stream-friendly ui browser widget for navigating directories, built with [yo-yo](https://www.npmjs.org/yo-yo).

[![NPM](https://nodei.co/npm/yo-fs.png)](https://nodei.co/npm/yo-fs/)

## api

#### `yofs(path, entries, [opts], onclick)`

  * `path`: the directory or filename to display
  * `entries`: a list of entries with `name`, `size`, `modified`, `createReadStream`
  * `opts`: `{offset: 0, limit: entries.length}` page the entry list
  * `onclick`: fires when a folder, file, or back button is clicked.

## example

```js
var yofs = require('yo-fs')
var yo = require('yo-yo')

var entries = []
var opts = {
  offset: 0,
  limit: 10 // only show 10 files at a time
}

function onclick (event, entry) {
  console.log('i clicked', entry)
}

// only create the top-level element once
var el = yofs('/', entries, opts, onclick)
document.body.appendChild(el)

// update the tree's internal html widget using yo
function update () {
  var fresh = tree.render('/', entries, opts, onclick)
  yo.update(tree.widget, fresh)
}

var stream = //stream that gives me some data...

stream.on('data', function (entry) {
  entries.push(entry)
  update()
}
```
