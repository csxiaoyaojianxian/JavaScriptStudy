var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var fs = require('fs')
var Path = require('path')
var md5 = require('md5')
var transformerVersion = require('../package.json').version

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

function replaceContent(code, replaceContentObj) {
  Object.keys(replaceContentObj).forEach(function (key) {
    code = code.replace(new RegExp(key, 'g'), replaceContentObj[key])
  })
  return code
}

var parser = require('../lib/parser')
var transformer = require('../')

describe('parse', function () {

  it('parse single content', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/single.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/single.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(0)
  })

  it('parse single content to old format', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/single.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path, true)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/single-old.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(0)
  })

  it('parse content with style', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/style.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/style.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(1)
    expect(logs).eql([{name: 'foo', line: 2, column: 3, reason: 'NOTE: property value `red` is autofixed to `#FF0000`'}])
  })

  it('parse content with class', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/class.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/class.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(2)
    expect(logs).eql([{name: 'foo', reason: 'NOTE: property value `red` is autofixed to `#FF0000`', line: 6, column: 11},
      {name: 'foo', reason: 'NOTE: unit `px` is not supported and property value `48px` is autofixed to `48`', line: 6, column: 23}])
  })

  it('parse content with image', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/picture.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/picture.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(0)
  })

  it('parse content with javascript action', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/action.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/action.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(0)
  })

  it('parse content with javascript data', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    parser.parse('foo', readFile(path + '/data.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(1)
    expect(results[0]).eql({name: 'foo', content: removeEndingLineBreak(readFile(path + '/data.bundle'))})
    expect(logs).is.an.array
    expect(logs.length).eql(0)
  })

  it('parse content with component', function () {
    var path = 'test/parse'
    var elements = {}
    var results = []
    var bootstrapParams = {}
    var thirdPartyJs = {}
    var logs = []

    transformer.parse('foo', readFile(path + '/component.html'), results, bootstrapParams, thirdPartyJs, logs, elements, path)
    expect(results).is.an.array
    expect(results.length).eql(2)
    expect(logs).is.an.array
    expect(logs.length).eql(0)

    var output = '// { "framework": "Weex" }\n\n'
    output += results.reverse().map(function (item) {return item.content}).join('\n\n// module\n\n')
    expect(output).eql(removeEndingLineBreak(readFile(path + '/component.bundle')))
  })

  it('generate', function () {
    var path = 'test/parse'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/component.html'), path, elements).result
    expect(removeEndingLineBreak(output)).eql(readFile(path + '/component.bundle') + '\n// require module\nbootstrap(\'@weex-component/foo\', {"transformerVersion":"' + transformerVersion + '"})')
  })

  it('generate old format', function () {
    var path = 'test/parse'
    var elements = {}

    var output = transformer.transformOld('foo', readFile(path + '/component.html'), path, elements).result
    expect(output).eql(readFile(path + '/component-old.bundle') + '\n// require module\nrender(\'foo\', {})')
  })

  it('require third party js', function () {
    var path = 'test/parse'
    var elements = {}

    var output = transformer.transform('foo', readFile(path + '/require.html'), path, elements).result
    var pos = output.indexOf('\n\n\n')
    var thirdPartyJsCode = output.slice(0, pos)
    var bundleCode = output.slice(pos + 3)
    var md5PathP = md5(Path.join(process.cwd(), path, './3rd/param.js'))
    var md5PathM = md5(Path.join(process.cwd(), './node_modules/md5/md5.js'))
    var expected = readFile(path + '/require.bundle') + '\n// require module\nbootstrap(\'@weex-component/foo\', {"transformerVersion":"' + transformerVersion + '"})'
    expected = replaceContent(expected, {'###MD5P###': md5PathP, '###MD5M###': md5PathM})
    expect(removeEndingLineBreak(bundleCode)).eql(expected)
    var evalCode = thirdPartyJsCode + '; var param = browserifyRequire("' + md5PathP + '").getParam(); var md5 = browserifyRequire("' + md5PathM + '"); md5(param)'
    expect(eval(evalCode)).eql(md5('ab'))
  })
})
