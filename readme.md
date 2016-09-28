# yo-fs

A client-side modular, stream-friendly ui browser widget for navigating directories, built with [yo-yo](npmjs.org/yo-yo).

Can also be used in server-side applications to statically render directory trees via javascript.

[![NPM](https://nodei.co/npm/yo-fs.png)](https://nodei.co/npm/yo-fs/)

## api

#### `yofs(path, entries, onclick)`

  * `path`: the directory or filename to display
  * `entries`: a list of entries with `name`, `size`, `modified`, `createReadStream`
  * `onclick`: fires when a folder, file, or back button is clicked. onclick is no-opped for server-side renderings.

## example

```js
var yofs = require('yo-fs')
var yo = require('yo-yo')

var entries = []

function onclick (event, entry) {
  console.log('i clicked', entry)
}

// only create the top-level element once
var el = yofs('/', entries, onclick)
document.body.appendChild(el)

// update the tree's internal html widget using yo
function update () {
  var fresh = tree.render('/', entries, onclick)
  yo.update(tree.widget, fresh)
}

var stream = //stream that gives me some data...

stream.on('data', function (entry) {
  entries.push(entry)
  update()
}
```
