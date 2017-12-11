var parser = require('./lib/parser')
var scripter = require('weex-scripter')
var transformerVersion = require('./package.json').version

function transform(name, code, path, elements, config) {
  config = config || {}

  var path = path || '.'
  var elements = elements || {}
  var results = []
  var bootstrapParams = {}
  var thirdPartyJs = {}
  var logs = []
  var oldFormat = config.oldFormat === true ? true : false
  var isEntry = config.isEntry !== false ? true : false

  parser.parse(name, code, results, bootstrapParams, thirdPartyJs, logs, elements, path, oldFormat)

  var output = '// { "framework": "Weex" }\n\n'

  output += results.reverse().map(function (item) {
    return item.content
  }).join('\n\n// module\n\n')

  if (oldFormat) {
    output += '\n\n// require module\nrender(\'' + name + '\', {})'
  }
  else {
    if (Object.keys(thirdPartyJs).length) {
      output = [scripter.getBundle(thirdPartyJs), output].join('\n\n')
    }
    if (isEntry) {
      bootstrapParams.config = bootstrapParams.config || {}
      bootstrapParams.config.transformerVersion = transformerVersion
      var configJson = JSON.stringify(bootstrapParams.config)
      var dataJson = JSON.stringify(bootstrapParams.data)
      output += '\n\n// require module\nbootstrap(\'@weex-component/' + name + '\', ' + configJson
      if (dataJson) {
        output += ', ' + dataJson + ')'
      }
      else {
        output += ')'
      }
    }
  }

  logs = filterLogs(logs, config.logLevel)

  return {result: output, logs: logs}
}

function filterLogs(logs, logLevel) {
  logLevel = logLevel ? logLevel.toUpperCase() : 'NOTE'
  var logLevels = ['OFF', 'ERROR', 'WARNING', 'NOTE']
  if (logLevel === 'ALL' || logLevels.indexOf(logLevel) === -1) {
    logLevel = 'NOTE'
  }
  var specifyLevel = logLevels.indexOf(logLevel)

  return logs.filter(function (log) {
    var curLevel = logLevels.indexOf(log.reason.match(/^(ERROR|WARNING|NOTE): /)[1])
    return curLevel <= specifyLevel
  })
}

function parseNew(name, content, results, bootstrapParams, thirdPartyJs, logs, elements, path) {
  return parser.parse(name, content, results, bootstrapParams, thirdPartyJs, logs, elements, path)
}

function parseOld(name, content, results, bootstrapParams, thirdPartyJs, logs, elements, path) {
  return parser.parse(name, content, results, bootstrapParams, thirdPartyJs, logs, elements, path, true)
}

function transformNew(name, code, path, elements, config) {
  return transform(name, code, path, elements, config)
}

function transformOld(name, code, path, elements) {
  return transform(name, code, path, elements, {oldFormat: true})
}

module.exports = {
  parse: parseNew,
  parseOld: parseOld,
  transform: transformNew,
  transformOld: transformOld
}
