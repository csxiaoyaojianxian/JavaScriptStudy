var fs = require('fs')
var path = require('path')
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var md5 = require('md5')
var getBundle = require('../lib/require-bundle').getBundle


describe('bundle of 3rd party js', function () {
  it('one entry file', function () {
    var requiresObj = {}
    var absolutePath = path.join(__dirname, 'bundle/a.js')
    var md5Path = md5(absolutePath)
    requiresObj[md5Path] = absolutePath

    var outputBundleCode = getBundle(requiresObj)
    var evalCode = outputBundleCode + '; var aModule = browserifyRequire("' + md5Path + '"); aModule.getA();'
    expect(eval(evalCode)).eql('ab')
  })

  it('multiple entry file', function () {
    var requiresObj = {}
    var absolutePathA = path.join(__dirname, 'bundle/a.js')
    var md5PathA = md5(absolutePathA)
    requiresObj[md5PathA] = absolutePathA
    var absolutePathC = path.join(__dirname, 'bundle/c.js')
    var md5PathC = md5(absolutePathC)
    requiresObj[md5PathC] = absolutePathC

    var outputBundleCode = getBundle(requiresObj)
    var evalCodeA = outputBundleCode + '; var aModule = browserifyRequire("' + md5PathA + '"); aModule.getA();'
    var evalCodeC = outputBundleCode + '; var cModule = browserifyRequire("' + md5PathC + '"); cModule.getC();'
    expect(eval(evalCodeA)).eql('ab')
    expect(eval(evalCodeC)).eql('c require')
  })
})
