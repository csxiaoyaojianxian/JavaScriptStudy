"use strict";

module.exports = function (source) {
  this.cacheable && this.cacheable();

  return "module.exports = " + source;
};