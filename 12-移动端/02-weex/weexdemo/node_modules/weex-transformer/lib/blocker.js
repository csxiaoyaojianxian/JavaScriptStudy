var parse5 = require('parse5')

function parse(code, done) {
  var doc = parse5.parseFragment(code, {treeAdapter: parse5.treeAdapters.default, locationInfo: true})

  // doc: #document-fragment
  // doc.childNodes: [template, style, ...]
  var result = []
  doc.childNodes.forEach(function (child) {
    var start, end, line, column

    if (child.__location) {
      var __location = child.__location
      if (__location.startTag && __location.endTag) {
        start = __location.startTag.endOffset || 0
        end = __location.endTag.startOffset || 0
      }
      else {
        start = __location.startOffset || 0
        end = __location.endOffset || 0
      }
      line = __location.line
      column = __location.col
    }
    /* istanbul ignore else */
    else {
      start = end = line = column = 0
    }

    var childResult = {
      type: child.nodeName,
      start: start,
      end: end,
      line: line,
      column: column,
      content: code.substring(start, end)
    }

    if (child.attrs && child.attrs.length) {
      child.attrs.forEach(function (item) {
        childResult[item.name] = item.value
      })
    }

    result.push(childResult)
  })

  done(null, result)
}

function format(code, done) {
  var result = {}
  parse(code, function (err, blocks) {
    blocks.forEach(function (block) {
      var subResult
      switch (block.type) {
        case 'template':
        case 'config':
        case 'data':
        if (!result[block.type]) {
          result[block.type] = block
        }
        break
        case 'style':
        if (!result.styles) {
          result.styles = []
        }
        result.styles.push(block)
        break
        case 'script':
        if (!result.scripts) {
          result.scripts = []
        }
        result.scripts.push(block)
        break
        case 'element':
        case 'wx-element':
        case 'wa-element':
        case 'we-element':
        if (!result.elements) {
          result.elements = {}
        }
        result.elements[block.name] = block
        break
        default:
        // console.log('unknown block type')
        break
      }
    })

    done(null, result)
  })
}

module.exports = {
  parse: parse,
  format: format
}
