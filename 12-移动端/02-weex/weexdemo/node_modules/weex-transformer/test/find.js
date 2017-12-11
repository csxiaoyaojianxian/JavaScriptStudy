var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var finder = require('../lib/finder')

describe('find name from elements or files', function () {
  var elements = {x: {}}
  var env = {path: 'test/find', elements: elements}

  it('find from elements', function () {
    var result = finder.find('x', env)
    expect(result).equal(elements.x)
  })

  it('find from files', function () {
    var result

    result = finder.find('a', env)
    expect(result.content).eql('a.wx\n')
    expect(result.path).eql('test/find/a.wx')

    result = finder.find('b', env)
    expect(result.content).eql('b.wa\n')
    expect(result.path).eql('test/find/b.wa')

    result = finder.find('c', env)
    expect(result.content).eql('c.html\n')
    expect(result.path).eql('test/find/c.html')

    result = finder.find('d', env)
    expect(result.content).eql('d.component\n')
    expect(result.path).eql('test/find/d.component')
  })
})
