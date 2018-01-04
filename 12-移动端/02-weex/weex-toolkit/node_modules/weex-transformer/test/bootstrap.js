var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var fs = require('fs')
var transfomerVersion = require('../package.json').version

function readFile(filepath) {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, {encoding: 'utf-8'}) || ''
  }
  return ''
}

function removeEndingLineBreak(code) {
  if (code.length && code[code.length - 1] === '\n') {
    return code.substr(0, code.length - 1)
  }
  return code
}

function addVersionInfo(code) {
  return code.replace('###TRANSFORMER_VERSION###', transfomerVersion)
}

var transformer = require('../')

describe('bootstrap params', function () {

  it('normal config and data', function () {
    var path = 'test/bootstrap'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/normal.html'), path, elements).result
    var expected = removeEndingLineBreak(addVersionInfo(readFile(path + '/normal.bundle')))
    expect(output).eql(expected)
  })

  it('no config', function () {
    var path = 'test/bootstrap'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/no-config.html'), path, elements).result
    var expected = removeEndingLineBreak(addVersionInfo(readFile(path + '/no-config.bundle')))
    expect(output).eql(expected)
  })

  it('no data', function () {
    var path = 'test/bootstrap'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/no-data.html'), path, elements).result
    var expected = removeEndingLineBreak(addVersionInfo(readFile(path + '/no-data.bundle')))
    expect(output).eql(expected)
  })

  it('handle error', function () {
    var path = 'test/bootstrap'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/error.html'), path, elements)
    var expected = removeEndingLineBreak(addVersionInfo(readFile(path + '/error.bundle')))
    expect(output.result).eql(expected)
    expect(output.logs).is.an.array
    expect(output.logs.length).eql(3)
    expect(output.logs).eql([{name: 'foo', reason: 'NOTE: property value `column` is the DEFAULT value for `flex-direction` (could be removed)', line: 39, column: 3},
      {name: 'foo', reason: 'ERROR: invalid json of `config`', line: 44, column: 1},
      {name: 'taobao-item', reason: 'ERROR: only entry module can have `data`', line: 14, column: 3}])
  })

  it('not entry', function () {
    var path = 'test/bootstrap'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/no-data.html'), path, elements, {isEntry: false}).result
    expect(output.indexOf('bootstrap(')).eql(-1)
  })
})
