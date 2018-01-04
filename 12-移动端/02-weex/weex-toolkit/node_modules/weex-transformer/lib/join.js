// code < scripter.fix(code)
// code < scripter.parseAndReplaceRequire(code)
// code < scripter.getBundle(requires)
var scripter = require('weex-scripter')
var fix = scripter.fix
var formatWhenFix = scripter.formatWhenFix

function extend(dest, src) {
  for (var i in src) {
    dest[i] = src[i]
  }
}

function mergeStyle(dest, src) {
  for (var className in src) {
    if (dest[className]) {
      extend(dest[className], src[className])
    }
    else {
      dest[className] = src[className]
    }
  }
}

function markFunc(k, v) {
  if (typeof v === 'function') {
    return '###FUNCTION_START' + v.toString() + 'FUNCTION_END###'
  }
  return v
}

function remarkFunc(code) {
  return code.replace(/"###FUNCTION_START/g, '').replace(/FUNCTION_END###"/g, '')
}

function join(name, template, styleList, scriptList) {
  var scriptCode = scriptList.map(fix).join('\n\n;')

  var style = {}
  styleList.forEach(function (s) {
    mergeStyle(style, s)
  })
  var styleCode = 'module.exports.style = ' + JSON.stringify(style, null, 2)

  var templateCode = 'module.exports.template = ' + remarkFunc(JSON.stringify(template, markFunc, 2))

  return ['define(\'@weex-component/' + name + '\', function (require, exports, module) {', scriptCode, styleCode, templateCode, '})'].join('\n\n;')
}

function joinOld(name, template, styleList, scriptList) {
  var style = {}
  styleList.forEach(function (s) {
    mergeStyle(style, s)
  })
  var styleCode = ', style: ' + JSON.stringify(style, null, 2)

  var templateCode = ', template: ' + remarkFunc(JSON.stringify(template, markFunc, 2))

  var scriptCode = ''
  if (scriptList && scriptList.length) {
    scriptCode = scriptList[0]
    scriptCode = formatWhenFix(scriptCode, true)
    scriptCode = scriptCode.substring(18, scriptCode.length - 2)
  }
  else {
    styleCode = styleCode.substr(2)
  }

  // oldFix
  // find module.exports = {...}
  // append template, deps, style

  return ['register(\'' + name + '\', {', scriptCode, styleCode, templateCode, '})'].join('\n')
}

exports.join = join
exports.joinOld = joinOld
