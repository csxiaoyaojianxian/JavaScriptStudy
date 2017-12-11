var a = require('./a')
var b = require('./b')

function getParam() {
  return a.getA() + b.getB()
}

exports.getParam = getParam
