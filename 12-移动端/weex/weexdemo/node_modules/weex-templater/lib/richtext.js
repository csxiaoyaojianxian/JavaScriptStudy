function stringify(json) {
  return JSON.stringify(json, function replacer(key, value) {
    if (typeof value === 'function') {
      return value.toString()
    }
    return value;
  })
}

/**
 * format richtext root node
 * - children -> attr.value binding function
 *
 * @param  {Node} node
 */
// TODO: support event
function format(node) {
  var ret = node.children.map(function (child) {
    var val = stringify(child)
    val = val.replace(/\"function\s*\(\)\s*{\s*return\s*(.*?)}\"/g, function ($0, $1) {
      return $1
    }).replace(/\"([^,]*?)\":/g, function ($0, $1) {
      return $1 + ': '
    }).replace(/(,)(\S)/g, function ($0, $1, $2) {
      return $1 + ' ' + $2
    }).replace(/\"/g, '\'')

    var hasClassList = false
    val = val.replace(/classList:\s*\[(.*?)\]/g, function ($0, $1) {
      var styleMatch = val.match(/,\s*style:\s*({.*?})/)
      hasClassList = true
      var classArr = $1.trim().split(/\s*,\s*/).map(function (klass) {
        return '_s[' + klass + ']'
      })
      classArr.unshift(styleMatch && styleMatch[1] ? styleMatch[1] : '{}')
      return 'style: (function () { var _s = this._css; return Object.assign(' + classArr.join(', ') + '); }).call(this)'
    })
    if (hasClassList) {
      val = val.replace(/,\s*style:\s*({.*?})/g, '')
    }
    return val
  });

  delete node.children
  node.attr = node.attr || {}
  node.attr.value = eval('(function () {return [' + ret.join(', ') + ']})')
}

/**
 * walk all nodes and format richtext root node
 *
 * @param  {Node} node
 */
function walkAndFormat(node) {
  if (node) {
    if (node.append !== 'once') {
      if (node.children && node.children.length) {
        for (var i = 0, len = node.children.length; i < len; i++) {
          walkAndFormat(node.children[i])
        }
      }
    }
    else {
      format(node)
    }
  }
}

exports.walkAndFormat = walkAndFormat
