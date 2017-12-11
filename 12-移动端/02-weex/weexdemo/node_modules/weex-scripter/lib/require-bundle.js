var path = require('path')
var execSync = require('child_process').execSync
var resolveBin = require('resolve-bin')

function replaceRequire(code) {
  var count = 0
  var hasRequire = false
  code = code.replace(/require/g, function ($0) {
    hasRequire = true
    return count++ < 5 ? 'browserifyRequire' : $0
  })
  if (hasRequire) {
    code = 'var ' + code
  }
  return code
}

function getBundle(requires) {
  var cmd = '"' + resolveBin.sync('browserify') + '"'
  Object.keys(requires).forEach(function (key) {
    cmd += ' -r ' + '"' + requires[key] + ':' + key + '"'
  })
  var bundleCode = execSync(cmd)
  bundleCode = replaceRequire(bundleCode.toString())
  return bundleCode
}

exports.getBundle = getBundle
