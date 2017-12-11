var path = require('path')
var fs = require('fs')
var md5 = require('md5')
var existsSync = fs.existsSync || path.existsSync

var nodePaths = process.env.NODE_PATH ? process.env.NODE_PATH.split(':') : []
var cwd = process.cwd()
nodePaths.push(cwd)

function resolvePath(searchPath, pathBase) {
  if (searchPath[0] === '.') {
    // relative path, e.g. require("./foo")
    return findModuleMain(path.resolve(pathBase, searchPath))
  }

  // npm-style path, e.g. require("npm").
  // Climb parent directories in search for "node_modules"
  var modulePath = findModuleMain(path.resolve(pathBase, 'node_modules', searchPath))
  if (modulePath) {
    return modulePath
  }

  return ''
}

function resolveRequire(rawPath, currentPath) {
  var resolvedPath = resolvePath(rawPath, path.dirname(currentPath))

  if (!resolvedPath && rawPath[0] !== '.' && rawPath[0] !== '/') {
    for (var i = 0; i < nodePaths.length; i++) {
      resolvedPath = findModuleMain(path.resolve(nodePaths[i], rawPath))
      /* istanbul ignore if */
      if (resolvedPath) {
        break
      }
    }
  }

  return resolvedPath
}

function findModuleMain(absModulePath) {
  var foundPath = ''
  function attempt(aPath) {
    if (foundPath) {
      return
    }
    if (existsSync(aPath)) {
      foundPath = aPath
    }
  }
  if (path.extname(absModulePath) === '.js') {
    absModulePath = absModulePath.replace(/\..+/, '')
  }

  attempt(absModulePath + '.js')
  try {
    var pkg = JSON.parse(fs.readFileSync(absModulePath + '/package.json').toString())
    attempt(path.resolve(absModulePath, pkg.main + '.js'))
    attempt(path.resolve(absModulePath, pkg.main))
  } catch (e) {}
  attempt(absModulePath + '/index.js')

  return foundPath
}

var REQUIRE_REGEXP = /require\s*\(['"]([\w\/\.-]*)['"]\)/g // do not contain `@weex-module` and `@weex-component`

function parseAndReplaceRequire(code, curPath) {
  curPath = curPath || '.'
  var requires = {}
  var log = []
  code = code.replace(REQUIRE_REGEXP, function ($0, $1) {
    var subModulePath

    subModulePath = resolveRequire(path.resolve(cwd, curPath, $1), '.')
    if (!subModulePath) {
      subModulePath = resolveRequire($1, '.')
    }

    if (!subModulePath) {
      log.push({reason: 'ERROR: Cannot find required module "' + $1 + '"'})
      return $0
    }
    else {
      var md5Path = md5(subModulePath)
      requires[md5Path] = subModulePath
      return 'browserifyRequire("' + md5Path +  '")'
    }
  })
  return {
    code: code,
    requires: requires,
    log: log
  }
}

exports.parseAndReplaceRequire = parseAndReplaceRequire
