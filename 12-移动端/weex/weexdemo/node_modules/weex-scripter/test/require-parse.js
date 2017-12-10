var path = require('path')
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var md5 = require('md5')
var parseAndReplaceRequire = require('../lib/require-parse').parseAndReplaceRequire


describe('parse and replace require 3rd party js', function () {
  it('implicit node_modules', function () {
    var code = 'var a = require("md5");'
    var absolutePath = path.join(__dirname, '../node_modules/md5/md5.js')
    var md5Path = md5(absolutePath)
    var expected = {
      code: 'var a = browserifyRequire("' + md5Path + '");',
      requires: {},
      log: []
    }
    expected.requires[md5Path] = absolutePath
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('explicit node_modules', function () {
    var code = 'var a = require("./node_modules/md5");'
    var absolutePath = path.join(__dirname, '../node_modules/md5/md5.js')
    var md5Path = md5(absolutePath)
    var expected = {
      code: 'var a = browserifyRequire("' + md5Path + '");',
      requires: {},
      log: []
    }
    expected.requires[md5Path] = absolutePath
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('current directory with no extname', function () {
    var code = 'var a = require("./lib/fix");'
    var absolutePath = path.join(__dirname, '../lib/fix.js')
    var md5Path = md5(absolutePath)
    var expected = {
      code: 'var a = browserifyRequire("' + md5Path + '");',
      requires: {},
      log: []
    }
    expected.requires[md5Path] = absolutePath
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('current directory with extname', function () {
    var code = 'var a = require("./lib/fix.js");'
    var absolutePath = path.join(__dirname, '../lib/fix.js')
    var md5Path = md5(absolutePath)
    var expected = {
      code: 'var a = browserifyRequire("' + md5Path + '");',
      requires: {},
      log: []
    }
    expected.requires[md5Path] = absolutePath
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('parent directory with no extname', function () {
    var code = 'var a = require("./test/fix");'
    var absolutePath = path.join(__dirname, '../test/fix.js')
    var md5Path = md5(absolutePath)
    var expected = {
      code: 'var a = browserifyRequire("' + md5Path + '");',
      requires: {},
      log: []
    }
    expected.requires[md5Path] = absolutePath
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('parent directory with extname', function () {
    var code = 'var a = require("./test/fix.js");'
    var absolutePath = path.join(__dirname, '../test/fix.js')
    var md5Path = md5(absolutePath)
    var expected = {
      code: 'var a = browserifyRequire("' + md5Path + '");',
      requires: {},
      log: []
    }
    expected.requires[md5Path] = absolutePath
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('require @weex-module', function () {
    var code = 'var a = require("@weex-module/xxx");'
    var expected = {
      code: 'var a = require("@weex-module/xxx");',
      requires: {},
      log: []
    }
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('require @weex-component', function () {
    var code = 'var a = require("@weex-component/xxx");'
    var expected = {
      code: 'var a = require("@weex-component/xxx");',
      requires: {},
      log: []
    }
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('multiple requires', function () {
    var code = 'var a = require("md5"); var b = require("test/fix"); var c = require("@weex-component/xxx");'
    var absolutePathA = path.join(__dirname, '../node_modules/md5/md5.js')
    var md5PathA = md5(absolutePathA)
    var absolutePathB = path.join(__dirname, '../test/fix.js')
    var md5PathB = md5(absolutePathB)
    var expected = {
      code: 'var a = browserifyRequire("' + md5PathA + '"); var b = browserifyRequire("' + md5PathB + '"); var c = require("@weex-component/xxx");',
      requires: {},
      log: []
    }
    expected.requires[md5PathA] = absolutePathA
    expected.requires[md5PathB] = absolutePathB
    expect(parseAndReplaceRequire(code)).eql(expected)
  })

  it('cannot find required module', function () {
    var code = 'var a = require("underscore")'
    var expected = {
      code: 'var a = require("underscore")',
      requires: {},
      log: [{reason: 'ERROR: Cannot find required module "underscore"'}]
    }
    expect(parseAndReplaceRequire(code)).eql(expected)
  })
})
