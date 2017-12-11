var parse5 = require('parse5')
var validator = require('./lib/validator')
var richtext = require('./lib/richtext')

/**
 * walk all nodes
 * - tag name checking
 * - attrs checking
 * - children checking
 *
 * @param  {Node} node
 * @param  {object} output{result, deps[], log[]}
 * @param  {Node} previousNode
 */
function walk(node, output, previousNode) {

  // tag name
  validator.checkTagName(node, output)

  // attrs: id/class/style/if/repeat/append/event/attr
  var attrs = node.attrs || []
  attrs.forEach(function switchAttr(attr) {
    var name = attr.name
    var value = attr.value

    var locationInfo = {line: 1, column: 1}
    if (node.__location) {
      locationInfo = {
        line: node.__location.line,
        column: node.__location.col
      }
    }

    switch (name) {
      case 'id':
      validator.checkId(value, output)
      break
      case 'class':
      validator.checkClass(value, output)
      break
      case 'style':
      validator.checkStyle(value, output, locationInfo)
      break
      case 'if':
      validator.checkIf(value, output)
      break
      case 'else':
      previousNode && previousNode.attrs.forEach(function (attr) {
        if (attr.name === 'if') {
          validator.checkIf(attr.value, output, true)
        }
      })
      break
      case 'repeat':
      validator.checkRepeat(value, output)
      break
      case 'append':
      validator.checkAppend(value, output)
      break
      default:
      if (name.match(/^on/)) {
        validator.checkEvent(name, value, output)
      }
      else {
        validator.checkAttr(name, value, output, node.tagName, locationInfo)
      }
    }
  })

  // children
  var originResult = output.result
  var childNodes = node.childNodes
  if (childNodes && childNodes.length) {

    var previous // FIXME: `parse5` has no previous sibling element information
    childNodes.forEach(function (child, i) {
      if (i > 0) {
        previous = childNodes[i - 1]
      }
      if (child.nodeName.match(/^#/)) {
        // special rules for text content in <text>
        if (child.nodeName === '#text' && child.value.trim()) {
          var tempResult = output.result
          output.result = originResult
          validator.checkAttr('value', child.value, output)
          output.result = tempResult
        }
        return
      }
      var childResult = {}
      output.result = childResult
      originResult.children = originResult.children || []
      originResult.children.push(childResult)
      walk(child, output, previous)
    })
  }
  output.result = originResult
}

exports.parse = function parse(code, done) {
  var doc = parse5.parseFragment(code, {treeAdapter: parse5.treeAdapters.default, locationInfo: true})

  var output = {result: {}, deps: [], log: []}
  var current

  // doc: #document-fragment
  // doc.childNodes: [container]
  // -> doc.childNodes.length should be 1
  // doc.childNodes[0].childNodes [text, image, ...]
  /* istanbul ignore if */
  if (!doc || !doc.childNodes) {
    done(null, {
      jsonTemplate: output.result,
      deps: output.deps,
      log: output.log
    })
    return
  }

  var rootElements = doc.childNodes.filter(function (child) {
    return child.nodeName.charAt(0) !== '#'
  })

  /* istanbul ignore if */
  if (rootElements.length === 0) {
    done(null, {
      jsonTemplate: output.result,
      deps: output.deps,
      log: output.log
    })
    return
  }
  if (rootElements.length > 1) {
    output.log.push({reason: 'ERROR: only one root element required', line: 1, column: 1})
    done(null, {
      jsonTemplate: output.result,
      deps: output.deps,
      log: output.log
    })
    return
  }

  current = rootElements[0]

  walk(current, output)

  richtext.walkAndFormat(output.result)

  done(null, {
    jsonTemplate: output.result,
    deps: output.deps,
    log: output.log
  })
}
