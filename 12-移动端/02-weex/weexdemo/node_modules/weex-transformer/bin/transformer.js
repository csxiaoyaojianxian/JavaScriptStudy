#!/usr/bin/env node

var program = require('commander')
var pkg = require('../package.json')
var weexTransformer = require('../index')
var chalk = require('chalk')
var path = require('path')
var printf = require('printf')
var fs = require('fs-extra')

// string to variables of proper type
function deserializeValue(value) {
  var num
  try {
    return value ?
      value == 'true' || value == true ||
      (value == 'false' || value == false ? false :
        value == 'null' ? null :
        !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
        /^[\[\{]/.test(value) ? JSON.parse(value) :
        value)
      : value
  } catch (e) {
    return value
  }
}

function saveFile(filePath, content) {
  fs.createFileSync(filePath)
  fs.writeFileSync(filePath, content, {encoding: 'utf8'})
  console.log(chalk.green.bold('[Success]: ') + filePath)
}

program.version(pkg.version)
  .option('-g, --logLevel [value]', 'specify log output level - `NOTE`, `WARNING`, `ERROR`, `OFF` (default: `NOTE`, equivalent to `ALL`)', 'NOTE')
  .option('-e, --isEntry [value]', 'whether is an entry module which has `bootstrap` (default: true)', true)
  .option('-l, --oldFormat [value]', 'whether to transform to old format (default: false)', false)
  .option('-o, --output [path]', 'the output file dirname')
  .parse(process.argv)

if (!program.args.length) {
  console.log(chalk.yellow.bold('[Info]: ') + 'No files to process!')
  return false
}

var options = {
  logLevel: deserializeValue(program.logLevel),
  isEntry: deserializeValue(program.isEntry),
  oldFormat: deserializeValue(program.oldFormat)
}

var EXT_NAME_LIST = ['wx', 'wa', 'we', 'html', 'component', 'vue']

program.args.forEach(function (filePath) {
  var extName = path.extname(filePath).slice(1)
  if (EXT_NAME_LIST.indexOf(extName) === -1) {
    return
  }

  var modName = path.basename(filePath).replace(/\..+/, '')
  var dirName = path.dirname(filePath)
  var content = fs.readFileSync(filePath, {encoding: 'utf8'})

  var ret = weexTransformer.transform(modName, content, dirName, null, options)
  var outputPath = path.join(program.output || dirName, modName + '.js')
  saveFile(outputPath, ret.result)

  // print logs
  ret.logs && ret.logs.forEach(function (log) {
    var reason = log.reason.toUpperCase()
    var formattedLog = printf('%-10s %4d:%-4d  %s', log.name, log.line, log.column, log.reason)
    if (reason.indexOf('NOTE') !== 0) {
      formattedLog = chalk[reason.indexOf('ERROR') === 0 ? 'red' : 'yellow'](formattedLog)
    }
    console.log(formattedLog)
  })
})
