var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var blocker = require('../lib/blocker')

describe('block', function () {
  it('get each block code', function (done) {
    var code = '<style>/* css code */</style><template><!-- html fragment code --></template><script>/* javascript code */</script><element name="x"><!-- html fragment code --></element>'
    blocker.parse(code, function (err, result) {
      expect(result).eql([
        {type: 'style', start: 7, end: 21, line: 1, column: 1, content: '/* css code */'},
        {type: 'template', start: 39, end: 66, line: 1, column: 30, content: '<!-- html fragment code -->'},
        {type: 'script', start: 85, end: 106, line: 1, column: 78, content: '/* javascript code */'},
        {type: 'element', start: 133, end: 160, line: 1, column: 116, content: '<!-- html fragment code -->', name: 'x'}
      ])
      done()
    })
  })

  it('get script type', function (done) {
    var code = '<script>/* javascript code */</script><script type="config">/* config code */</script><script type="data">/* data code */</script>'
    blocker.parse(code, function (err, result) {
      expect(result).eql([
        {type: 'script', start: 8, end: 29, line: 1, column: 1, content: '/* javascript code */'},
        {type: 'config', start: 60, end: 77, line: 1, column: 39, content: '/* config code */'},
        {type: 'data', start: 106, end: 121, line: 1, column: 87, content: '/* data code */'}
      ])
      done()
    })
  })

  it('jump comment node and text node', function (done) {
    var code = '<style>/* css code */</style><!-- comment code --><template><!-- html fragment code --></template><script>/* javascript code */</script>text node<element name="x"><!-- html fragment code --></element>'
    blocker.parse(code, function (err, result) {
      expect(result).eql([
        {type: 'style', start: 7, end: 21, line: 1, column: 1, content: '/* css code */'},
        {type: '#comment', start: 29, end: 50, line: 1, column: 30, content: '<!-- comment code -->'},
        {type: 'template', start: 60, end: 87, line: 1, column: 51, content: '<!-- html fragment code -->'},
        {type: 'script', start: 106, end: 127, line: 1, column: 99, content: '/* javascript code */'},
        {type: '#text', start: 136, end: 145, line: 1, column: 137, content: 'text node'},
        {type: 'element', start: 163, end: 190, line: 1, column: 146, content: '<!-- html fragment code -->', name: 'x'}
      ])
      done()
    })
  })

  it('get sub components', function (done) {
    var code = '<style>/* css code */</style><!-- comment code --><template><!-- html fragment code --></template><script>/* javascript code */</script>text node<element name="x"><!-- html fragment code --><template>T1</template></element>'
    blocker.parse(code, function (err, result) {
      expect(result).eql([
        {type: 'style', start: 7, end: 21, line: 1, column: 1, content: '/* css code */'},
        {type: '#comment', start: 29, end: 50, line: 1, column: 30, content: '<!-- comment code -->'},
        {type: 'template', start: 60, end: 87, line: 1, column: 51, content: '<!-- html fragment code -->'},
        {type: 'script', start: 106, end: 127, line: 1, column: 99, content: '/* javascript code */'},
        {type: '#text', start: 136, end: 145, line: 1, column: 137, content: 'text node'},
        {type: 'element', start: 163, end: 213, line: 1, column: 146, content: '<!-- html fragment code --><template>T1</template>', name: 'x'}
      ])
      done()
    })
  })
})

describe('format', function () {
  it('get template, style, script, config, data, elements from code blocks', function (done) {
    var code = '<style>/* css code */</style><!-- comment code --><template><!-- html fragment code --></template><script>/* javascript code */</script><script type="config">/* config code */</script><script type="data">/* data code */</script>text node<element name="x"><!-- html fragment code --></element>'
    blocker.format(code, function (err, result) {
      expect(result.template).eql({type: 'template', start: 60, end: 87, line: 1, column: 51, content: '<!-- html fragment code -->'})
      expect(result.styles).eql([{type: 'style', start: 7, end: 21, line: 1, column: 1, content: '/* css code */'}])
      expect(result.scripts).eql([{type: 'script', start: 106, end: 127, line: 1, column: 99, content: '/* javascript code */'}])
      expect(result.config).eql({type: 'config', start: 158, end: 175, line: 1, column: 137, content: '/* config code */'})
      expect(result.data).eql({type: 'data', start: 204, end: 219, line: 1, column: 185, content: '/* data code */'})
      expect(result.elements).eql({
        x: {type: 'element', start: 255, end: 282, line: 1, column: 238, content: '<!-- html fragment code -->', name: 'x'}
      })
      done()
    })
  })
})
