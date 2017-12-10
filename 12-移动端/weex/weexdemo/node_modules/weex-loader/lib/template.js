'use strict';

var _util = require('./util');

var _parser = require('./parser');

module.exports = function (source) {
  var _this = this;

  this.cacheable && this.cacheable();

  var callback = this.async();

  (0, _parser.parseTemplate)(source).then(function (_ref) {
    var parsed = _ref.parsed,
        log = _ref.log;

    if (log && log.length) {
      (0, _util.logWarn)(_this, log);
    }
    callback(null, parsed);
  }).catch(function (e) {
    callback(e, '');
  });
};