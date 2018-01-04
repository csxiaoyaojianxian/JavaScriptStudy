var b = require('./b')

exports.getA = function () {
  return 'a' + b.getB()
}
