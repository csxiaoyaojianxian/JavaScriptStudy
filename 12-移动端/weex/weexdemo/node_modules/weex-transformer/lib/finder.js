var fs = require('fs')
var path = require('path')

var EXT_NAME_ORDER = ['wx', 'wa', 'we', 'html', 'component', 'vue']

function find(name, env) {
  var elements = env.elements || {}
  var dir = env.path || '.'
  var el, content

  if (elements[name]) {
    el = elements[name]
  }
  else {
    EXT_NAME_ORDER.some(function (extName) {
      var p = path.join(dir, name + '.' + extName)
      if (fs.existsSync(p)) {
        el = {name: name, path: p, content: fs.readFileSync(p, {encoding: 'utf-8'})}
        return true
      }
    })
  }

  return el
}

exports.find = find
