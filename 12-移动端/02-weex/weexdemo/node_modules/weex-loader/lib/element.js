'use strict';

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _parser = require('./parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (source) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var loaderQuery = _loaderUtils2.default.parseQuery(this.query);
  var resourceQuery = _loaderUtils2.default.parseQuery(this.resourceQuery);
  var name = resourceQuery.name;

  var contentPromise = void 0;

  if (loaderQuery.extract) {
    contentPromise = (0, _parser.extractBlocks)(source, 'elements');
  } else {
    contentPromise = Promise.resolve({ content: source });
  }

  contentPromise.then(function (elements) {
    if (loaderQuery.raw) {
      return elements[name].content;
    }
  }).then(function (result) {
    callback(null, result);
  }).catch(function (e) {
    callback(e, '');
  });
};