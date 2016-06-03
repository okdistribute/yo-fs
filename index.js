var relative = require('relative-date')
var data = require('render-data')
var pretty = require('pretty-bytes')
var yo = require('yo-yo')

module.exports = render

function render (widget, root, entries, onclick) {
  var fresh = Tree(widget, root, entries, onclick)
  console.log(widget, fresh)
  if (widget) yo.update(widget, fresh)
  return fresh
}

function Tree (widget, root, entries, onclick) {
  var visible = []
  var roots = split(root)
  entries.forEach(function (entry) {
    var paths = split(entry.name)
    if (paths.length === (roots.length + 1)) {
      var isChild = true
      for (var i = 0; i < roots.length && isChild === true; i++) {
        isChild = (paths[i] === roots[i])
      }
      if (isChild === true) visible.push(entry)
    }
  })


  return yo`<ul id="file-widget">
    ${visible.map(function (entry) {
      return row(entry)
    })}
  </ul>`

  function row (entry) {
    function click (e) {
      if (entry.type === 'directory') {
        render(widget, entry.name, entries, onclick)
      } else if (entry.type === 'file') {
        var el = yo`<div id="data-viewport"></div>`
        data.render(entry, el, function (err, elem) {
          if (err) throw err
          console.log('done')
        })
      }
      onclick(e, entry)
    }
    return yo`<li class='entry-${entry.type}' onclick=${click}>
      <a href="javascript:void(0)">
        <span class="name">${entry.name}</span>
        <span class="modified">${relative(entry.mtime)}</span>
        <span class="size">${pretty(entry.length)}</span>
      </a>
    </li>`
  }

}

function split (pathName) {
  var fileArray = pathName.split('/')
  while (fileArray[0] === '' || fileArray[0] === '.') {
    fileArray.shift() // remove empty items from the beginning
  }
  while (fileArray[fileArray.length - 1] === '') {
    fileArray.pop() // remove empty items from the end
  }
  return fileArray
}
