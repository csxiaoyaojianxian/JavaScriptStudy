var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var fixer = require('../lib/fix')

describe('fix', function () {
  it('old fix method: ast hack and re-generate', function () {
    expect(fixer.formatWhenFix('module.exports = {data: {a: 1}}')).
      eql('module.exports = {\n    data: function () {\n        return { a: 1 };\n    }\n};')
    expect(fixer.formatWhenFix('module.exports = {data: function () {return {a: 1}}}')).
      eql('module.exports = {data: function () {return {a: 1}}}')
  })

  it('new fix method: loc-based hack', function () {
    expect(fixer.fix('module.exports = {data: {a: 1}}')).
      eql('module.exports = {data: function () {return {a: 1}}}')
    expect(fixer.fix('module.exports = {data: function () {return {a: 1}}}')).
      eql('module.exports = {data: function () {return {a: 1}}}')
  })

  it('fix code with multi lines', function () {
    var result = fixer.fix('module.exports = {\n    data: {a: 1}}')
    expect(result).eql('module.exports = {\n    data: function () {return {a: 1}}}')
  })

  it('fix code with other declarations', function () {
    var result = fixer.fix('require("./b.wx")\n\nvar c = require("./lib/c")\n\nmodule.exports = {\n    data: {\n        text: "hello " + c.name\n    }\n};')
    expect(result).eql('require("./b.wx")\n\nvar c = require("./lib/c")\n\nmodule.exports = {\n    data: function () {return {\n        text: "hello " + c.name\n    }}\n};')
  })
})
