'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScripter = useScripter;
exports.useStyler = useStyler;
exports.useTemplater = useTemplater;
function useScripter() {
  warn('useScripter()');
}
function useStyler() {
  warn('useStyler()');
}
function useTemplater() {
  warn('useTemplater()');
}

function warn(method) {
  console.warn('\x1B[1;32m[Warn]\x1B[0m: method ' + method + ' in weex-loader is no more necessary');
}