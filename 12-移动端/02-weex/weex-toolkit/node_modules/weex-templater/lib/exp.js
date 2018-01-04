var expParser = require('./parsers/expression')
var textParser = require('./parsers/text')

/**
 * transfer expressions
 * @param  {String} expContent
 * @param  {Boolean} toFunc
 * @return {String|Function} ret
 */
function transExpr(expContent, toFunc) {
  var ret
  expContent = expContent.trim().replace(/\"/g, '\'')
  if (!textParser.isExpr(expContent)) {
    ret = expContent
  }
  else {
    ret = []
    var tokens = textParser.parseText(expContent)
    var isSingle = tokens.length === 1
    tokens.forEach(function (token) {
      if (token.tag) {
        var res = expParser.parseExpression(token.value)
        if (!isSingle) {
          res = '(' + res + ')'
        }
        ret.push(res)
      }
      else {
        ret.push('\'' + token.value + '\'')
      }
    })
    ret = ret.join(' + ')
    if (toFunc !== false) {
      ret = eval('(function () {return ' + ret + '})')
    }
  }
  return ret
}

transExpr.isExpr = textParser.isExpr

module.exports = transExpr
