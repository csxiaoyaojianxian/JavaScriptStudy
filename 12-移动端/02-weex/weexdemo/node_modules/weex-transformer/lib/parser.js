var blocker = require('./blocker')
var finder = require('./finder')
var joiner = require('./join')

// templater.parse(code, done(err, result{jsonTemplate, deps, log}))
var templater = require('weex-templater')

// styler.parse(code, done(err, {jsonStyle, log}))
var styler = require('weex-styler')

// code < scripter.fix(code)
// code < scripter.parseAndReplaceRequire(code)
// code < scripter.getBundle(requires)
var scripter = require('weex-scripter')

function extend(dest, src) {
  for (var name in src) {
    if (!dest[name]) {
      dest[name] = src[name]
    }
  }
}

function getTemplate(name, templateBlock, deps, logs, element) {
  var code = templateBlock.content
  var jsonTemplate
  templater.parse(code, function (err, result) {
    jsonTemplate = result.jsonTemplate
    result.deps && result.deps.forEach(function (name) {
      deps.push(name)
    })
    result.log && result.log.forEach(function (log) {
      log.name = name
      if (log.line === 1) {
        log.column += templateBlock.start
      }
      log.line += templateBlock.line - 1
      if (element && element.line) {
        log.line += element.line - 1
      }
      logs.push(log)
    })
  })
  return jsonTemplate
}

function getStyle(name, styleBlock, styleList, logs, element) {
  var code = styleBlock.content
  styler.parse(code, function (err, result) {
    jsonStyle = result.jsonStyle
    styleList.push(result.jsonStyle)
    result.log && result.log.forEach(function (log) {
      log.name = name
      if (log.line === 1) {
        log.column += styleBlock.start
      }
      log.line += styleBlock.line - 1
      if (element && element.line) {
        log.line += element.line - 1
      }
      logs.push(log)
    })
  })
}

function getScript(name, scriptBlock, scriptList, logs, thirdPartyJs, path) {
  var result = scripter.parseAndReplaceRequire(scriptBlock.content, path)
  extend(thirdPartyJs, result.requires) // collect third party js requires
  scriptList.push(result.code)
  result.log && result.log.forEach(function (log) {
    logs.push({name: name, reason: log.reason, line: scriptBlock.line, column: scriptBlock.column})
  })
}

function parse(name, content, results, bootstrapParams, thirdPartyJs, logs, elements, path, oldFormat, deep) {
  deep = deep || 0

  // results[{name, content}]
  // elements[name] -> content
  var hasLoaded = results.some(function (itemResult) {
    return itemResult.name === name
  })

  if (hasLoaded) {
    return
  }

  blocker.format(content, function (err, result) {
    var template = {}, deps = [], styleList = [], scriptList = []
    var outputContent

    extend(elements, result.elements)

    if (result.template) {
      template = getTemplate(name, result.template, deps, logs, elements[name])
    }
    else {
      logs.push({name: name, reason: 'ERROR: should have a template tag', line: 1, column: 1})
      return
    }

    if (result.styles && result.styles.length) {
      result.styles.forEach(function (style) {
        getStyle(name, style, styleList, logs, elements[name])
      })
    }

    result.scripts = result.scripts || []
    result.scripts.forEach(function (script) {
      getScript(name, script, scriptList, logs, thirdPartyJs, path)
    })

    var opts = ['data', 'config']
    opts.forEach(function (opt) {
      if (result[opt]) {
        if (deep === 0) {
          try {
            var content = result[opt].content.replace(/^\s*module.exports\s*=\s*/, '')
            content = eval('(' + content + ')')
            bootstrapParams[opt] = content
          } catch (e) {
            logs.push({name: name, reason: 'ERROR: invalid json of `' + opt + '`', line: result[opt].line, column: result[opt].column})
          }
        }
        else {
          logs.push({name: name, reason: 'ERROR: only entry module can have `' + opt + '`', line: result[opt].line, column: result[opt].column})
        }
      }
    })

    if (oldFormat) {
      outputContent = joiner.joinOld(name, template, styleList, scriptList)
    }
    else {
      outputContent = joiner.join(name, template, styleList, scriptList)
    }
    results.push({name: name, content: outputContent})

    deps.forEach(function (name) {
      var el = finder.find(name, {path: path, elements: elements})
      if (el) {
        parse(name, el.content, results, bootstrapParams, thirdPartyJs, logs, elements, path, oldFormat, ++deep)
      }
    })
  })
}

exports.parse = parse
