var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var fs = require('fs')

function readFile(filepath) {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, {encoding: 'utf-8'}) || ''
  }
  return ''
}

var parser = require('../lib/parser')
var transformer = require('../')

describe('print logs', function () {
  it('one component with kinds of logs', function () {
    var path = 'test/log'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/normal.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(logs).is.an.array
    expect(logs.length).eql(14)
    expect(logs).eql([{name: 'foo', reason: 'NOTE: property value `red` is autofixed to `#FF0000`', line: 3, column: 5},
      {name: 'foo', reason: 'NOTE: `value` could be written as text content in <text>', line: 4, column: 5},
      {name: 'foo', reason: 'ERROR: tag `tabheader` should not have children', line: 5, column: 5},
      {name: 'foo', reason: 'ERROR: tag name `text` should just have one text node only', line: 6, column: 5},
      {name: 'foo', reason: 'NOTE: unit `px` is not supported and property value `200px` is autofixed to `200`', line: 12, column: 5},
      {name: 'foo', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 13, column: 5},
      {name: 'foo', reason: 'ERROR: property value `stretch` is not supported for `justify-content` (supported values are: `flex-start`|`flex-end`|`center`|`space-between`|`space-around`)', line: 14, column: 5},
      {name: 'foo', reason: 'ERROR: property value `center` is not supported for `height` (only number and pixel values are supported)', line: 15, column: 5},
      {name: 'foo', reason: 'ERROR: property value `90px` is not valid for `color`', line: 16, column: 5},
      {name: 'foo', reason: 'NOTE: property value `relative` is the DEFAULT value for `position` (could be removed)', line: 19, column: 5},
      {name: 'foo', reason: 'NOTE: property value `#ddd` is autofixed to `#dddddd`', line: 20, column: 5},
      {name: 'foo', reason: 'ERROR: Selector `.img .text` is not supported. Weex only support single-classname selector', line: 22, column: 3},
      {name: 'foo', reason: 'ERROR: undefined:2:10: property missing \':\'', line: 28, column: 10},
      {name: 'foo', reason: 'ERROR: Cannot find required module "px2rem"', line: 31, column: 1}])
  })

  it('one component in one line', function () {
    var path = 'test/log'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/oneline.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(logs).is.an.array
    expect(logs.length).eql(3)
    expect(logs).eql([{name: 'foo', reason: 'NOTE: property value `red` is autofixed to `#FF0000`', line: 1, column: 22},
      {name: 'foo', reason: 'NOTE: unit `px` is not supported and property value `200px` is autofixed to `200`', line: 1, column: 116},
      {name: 'foo', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 1, column: 130}])
  })

  it('one component with one element', function () {
    var path = 'test/log'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/element.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(2)
    expect(logs).is.an.array
    expect(logs.length).eql(6)
    expect(logs).eql([{name: 'foo', reason: 'NOTE: property value `red` is autofixed to `#FF0000`', line: 18, column: 5},
      {name: 'foo', reason: 'NOTE: unit `px` is not supported and property value `200px` is autofixed to `200`', line: 25, column: 5},
      {name: 'foo', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 26, column: 5},
      {name: 'bar', reason: 'NOTE: property value `yellow` is autofixed to `#FFFF00`', line: 4, column: 7},
      {name: 'bar', reason: 'NOTE: unit `px` is not supported and property value `100px` is autofixed to `100`', line: 10, column: 7},
      {name: 'bar', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 11, column: 7}])
  })

  it('one component with multiple elements', function () {
    var path = 'test/log'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/multiple.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(3)
    expect(logs).is.an.array
    expect(logs.length).eql(9)
    expect(logs).eql([{name: 'foo', reason: 'NOTE: property value `red` is autofixed to `#FF0000`', line: 33, column: 5},
      {name: 'foo', reason: 'NOTE: unit `px` is not supported and property value `200px` is autofixed to `200`', line: 41, column: 5},
      {name: 'foo', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 42, column: 5},
      {name: 'bar', reason: 'NOTE: property value `yellow` is autofixed to `#FFFF00`', line: 4, column: 7},
      {name: 'bar', reason: 'NOTE: unit `px` is not supported and property value `100px` is autofixed to `100`', line: 10, column: 7},
      {name: 'bar', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 11, column: 7},
      {name: 'baz', reason: 'NOTE: property value `green` is autofixed to `#008000`', line: 19, column: 7},
      {name: 'baz', reason: 'NOTE: unit `px` is not supported and property value `50px` is autofixed to `50`', line: 25, column: 7},
      {name: 'baz', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 26, column: 7}])
  })

  it('no template tag', function () {
    var path = 'test/log'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/no-template.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(0)
    expect(logs).is.an.array
    expect(logs.length).eql(1)
    expect(logs).eql([{name: 'foo', reason: 'ERROR: should have a template tag', line: 1, column: 1}])
  })

  it('multiple root elements in template', function () {
    var path = 'test/log'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/multiple-root.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(logs).is.an.array
    expect(logs.length).eql(1)
    expect(logs).eql([{name: 'foo', reason: 'ERROR: only one root element required', line: 1, column: 11}])
  })
})

describe('log levels', function () {
  it('level `NOTE`, `ALL`, default, not exist', function () {
    var path = 'test/log'
    var elements = {}
    var logsNote = transformer.transform('foo', readFile(path + '/normal.html'), path, elements, {logLevel: 'NOTE'}).logs
    var logsAll = transformer.transform('foo', readFile(path + '/normal.html'), path, elements, {logLevel: 'ALL'}).logs
    var logsDefault = transformer.transform('foo', readFile(path + '/normal.html'), path, elements).logs
    var logsNotExist = transformer.transform('foo', readFile(path + '/normal.html'), path, elements, {logLevel: 'not exist'}).logs
    var logsExpected = [{name: 'foo', reason: 'NOTE: property value `red` is autofixed to `#FF0000`', line: 3, column: 5},
      {name: 'foo', reason: 'NOTE: `value` could be written as text content in <text>', line: 4, column: 5},
      {name: 'foo', reason: 'ERROR: tag `tabheader` should not have children', line: 5, column: 5},
      {name: 'foo', reason: 'ERROR: tag name `text` should just have one text node only', line: 6, column: 5},
      {name: 'foo', reason: 'NOTE: unit `px` is not supported and property value `200px` is autofixed to `200`', line: 12, column: 5},
      {name: 'foo', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 13, column: 5},
      {name: 'foo', reason: 'ERROR: property value `stretch` is not supported for `justify-content` (supported values are: `flex-start`|`flex-end`|`center`|`space-between`|`space-around`)', line: 14, column: 5},
      {name: 'foo', reason: 'ERROR: property value `center` is not supported for `height` (only number and pixel values are supported)', line: 15, column: 5},
      {name: 'foo', reason: 'ERROR: property value `90px` is not valid for `color`', line: 16, column: 5},
      {name: 'foo', reason: 'NOTE: property value `relative` is the DEFAULT value for `position` (could be removed)', line: 19, column: 5},
      {name: 'foo', reason: 'NOTE: property value `#ddd` is autofixed to `#dddddd`', line: 20, column: 5},
      {name: 'foo', reason: 'ERROR: Selector `.img .text` is not supported. Weex only support single-classname selector', line: 22, column: 3},
      {name: 'foo', reason: 'ERROR: undefined:2:10: property missing \':\'', line: 28, column: 10},
      {name: 'foo', reason: 'ERROR: Cannot find required module "px2rem"', line: 31, column: 1}]
    expect(logsNote).is.an.array
    expect(logsAll).is.an.array
    expect(logsDefault).is.an.array
    expect(logsNotExist).is.an.array
    expect(logsNote.length).eql(14)
    expect(logsAll.length).eql(14)
    expect(logsDefault.length).eql(14)
    expect(logsNotExist.length).eql(14)
    expect(logsNote).eql(logsExpected)
    expect(logsAll).eql(logsExpected)
    expect(logsDefault).eql(logsExpected)
    expect(logsNotExist).eql(logsExpected)
  })

  it('level `WARNING`', function () {
    var path = 'test/log'
    var elements = {}
    var logs = transformer.transform('foo', readFile(path + '/normal.html'), path, elements, {logLevel: 'WARNING'}).logs
    expect(logs).is.an.array
    expect(logs.length).eql(9)
    expect(logs).eql([{name: 'foo', reason: 'ERROR: tag `tabheader` should not have children', line: 5, column: 5},
      {name: 'foo', reason: 'ERROR: tag name `text` should just have one text node only', line: 6, column: 5},
      {name: 'foo', reason: 'WARNING: `line-height` is not a standard property name (may not be supported)', line: 13, column: 5},
      {name: 'foo', reason: 'ERROR: property value `stretch` is not supported for `justify-content` (supported values are: `flex-start`|`flex-end`|`center`|`space-between`|`space-around`)', line: 14, column: 5},
      {name: 'foo', reason: 'ERROR: property value `center` is not supported for `height` (only number and pixel values are supported)', line: 15, column: 5},
      {name: 'foo', reason: 'ERROR: property value `90px` is not valid for `color`', line: 16, column: 5},
      {name: 'foo', reason: 'ERROR: Selector `.img .text` is not supported. Weex only support single-classname selector', line: 22, column: 3},
      {name: 'foo', reason: 'ERROR: undefined:2:10: property missing \':\'', line: 28, column: 10},
      {name: 'foo', reason: 'ERROR: Cannot find required module "px2rem"', line: 31, column: 1}])
  })

  it('level `ERROR`', function () {
    var path = 'test/log'
    var elements = {}
    var logs = transformer.transform('foo', readFile(path + '/normal.html'), path, elements, {logLevel: 'ERROR'}).logs
    expect(logs).is.an.array
    expect(logs.length).eql(8)
    expect(logs).eql([{name: 'foo', reason: 'ERROR: tag `tabheader` should not have children', line: 5, column: 5},
      {name: 'foo', reason: 'ERROR: tag name `text` should just have one text node only', line: 6, column: 5},
      {name: 'foo', reason: 'ERROR: property value `stretch` is not supported for `justify-content` (supported values are: `flex-start`|`flex-end`|`center`|`space-between`|`space-around`)', line: 14, column: 5},
      {name: 'foo', reason: 'ERROR: property value `center` is not supported for `height` (only number and pixel values are supported)', line: 15, column: 5},
      {name: 'foo', reason: 'ERROR: property value `90px` is not valid for `color`', line: 16, column: 5},
      {name: 'foo', reason: 'ERROR: Selector `.img .text` is not supported. Weex only support single-classname selector', line: 22, column: 3},
      {name: 'foo', reason: 'ERROR: undefined:2:10: property missing \':\'', line: 28, column: 10},
      {name: 'foo', reason: 'ERROR: Cannot find required module "px2rem"', line: 31, column: 1}])
  })

  it('level `OFF`', function () {
    var path = 'test/log'
    var elements = {}
    var logs = transformer.transform('foo', readFile(path + '/normal.html'), path, elements, {logLevel: 'OFF'}).logs
    expect(logs).is.an.array
    expect(logs.length).eql(0)
    expect(logs).eql([])
  })
})
