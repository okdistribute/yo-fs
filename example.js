var yofs = require('.')
var yo = require('yo-yo')

var onclick = function (event, entry) {
  console.log('i clicked', entry)
}

var entries = [entry()]

var el = yofs('/', entries, onclick)
document.body.appendChild(el)

setInterval(function () {
  entries.push(entry())
  yo.update(el, yofs('/', entries, onclick)) // dynamically updates the widget
}, 1000)

function entry () {
  return {
    name: '/' + Math.random().toString(16).slice(2) + '.txt',
    type: 'file',
    mtime: new Date,
    length: Math.random() * 1024 * 1024
  }
}
