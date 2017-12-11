var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var joiner = require('../lib/join')

describe('join', function () {
  it('join all together', function () {
    var template = {type: 'container', id: function () {return this.foo}}
    var styleList = [{classA: {a: 1, b: 2}}, {classA: {b: 4, c: 3}, classB: {e: 5}}]
    var scriptList = ['module.exports = {data: {foo: \'hello\'}}', 'var bar = 123']

    var output = joiner.join('test', template, styleList, scriptList)

    expect(output).eql('define(\'@weex-component/test\', function (require, exports, module) {\n\
\n\
;module.exports = {data: function () {return {foo: \'hello\'}}}\n\
\n\
;var bar = 123\n\
\n\
;module.exports.style = {\n\
  "classA": {\n\
    "a": 1,\n\
    "b": 4,\n\
    "c": 3\n\
  },\n\
  "classB": {\n\
    "e": 5\n\
  }\n\
}\n\
\n\
;module.exports.template = {\n\
  "type": "container",\n\
  "id": function () {return this.foo}\n\
}\n\
\n\
;})')
  })

  it('join to old format', function () {
    var template = {type: 'container', id: function () {return this.foo}}
    var styleList = [{classA: {a: 1, b: 2}}, {classA: {b: 4, c: 3}, classB: {e: 5}}]
    var scriptList = ['module.exports = {methods: {}, data: {foo: \'hello\'}}', 'var bar = 123']

    var output = joiner.joinOld('test', template, styleList, scriptList)

    expect(output).eql('register(\'test\', {\n\
\n\
    methods: {},\n\
    data: function () {\n\
        return { foo: \'hello\' };\n\
    }\n\
\n\
, style: {\n\
  "classA": {\n\
    "a": 1,\n\
    "b": 4,\n\
    "c": 3\n\
  },\n\
  "classB": {\n\
    "e": 5\n\
  }\n\
}\n\
, template: {\n\
  "type": "container",\n\
  "id": function () {return this.foo}\n\
}\n\
})')
  })

  it('join to old format with no data', function () {
    var template = {type: 'container', id: function () {return this.foo}}
    var styleList = [{classA: {a: 1, b: 2}}, {classA: {b: 4, c: 3}, classB: {e: 5}}]
    var scriptList = ['module.exports = {methods: {}}', 'var bar = 123']

    var output = joiner.joinOld('test', template, styleList, scriptList)

    expect(output).eql('register(\'test\', {\n\
 methods: {} \n\
, style: {\n\
  "classA": {\n\
    "a": 1,\n\
    "b": 4,\n\
    "c": 3\n\
  },\n\
  "classB": {\n\
    "e": 5\n\
  }\n\
}\n\
, template: {\n\
  "type": "container",\n\
  "id": function () {return this.foo}\n\
}\n\
})')
  })

  it('join to old format with no script', function () {
    var template = {type: 'container', id: function () {return this.foo}}
    var styleList = [{classA: {a: 1, b: 2}}, {classA: {b: 4, c: 3}, classB: {e: 5}}]
    var scriptList = []

    var output = joiner.joinOld('test', template, styleList, scriptList)

    expect(output).eql('register(\'test\', {\n\
\n\
style: {\n\
  "classA": {\n\
    "a": 1,\n\
    "b": 4,\n\
    "c": 3\n\
  },\n\
  "classB": {\n\
    "e": 5\n\
  }\n\
}\n\
, template: {\n\
  "type": "container",\n\
  "id": function () {return this.foo}\n\
}\n\
})')
  })
})
