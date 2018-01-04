# Weex `<script>` Transformer

[![NPM version][npm-image]][npm-url]
[![Build status][circle-image]][circle-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/weex-scripter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/weex-scripter
[circle-image]: https://circleci.com/gh/weexteam/weex-scripter.svg?style=svg
[circle-url]: https://circleci.com/gh/weexteam/weex-scripter/tree/master
[downloads-image]: https://img.shields.io/npm/dm/weex-scripter.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/weex-scripter

transform JavaScript

## API

- `fix(code)`: automatically add `data: {function () {return {...}}}` to init component data from `data: {...}`
- `parseAndReplaceRequire(code)`: parse third party js required in `<script>`, return the modified code and collect requires
    * note that `require` is automatically changed to `browserifyRequire` because of the built-in `require` in `js-framework`
- `getBundle(requires)`: bundle all the third party js required in `<script>` by using `browserify`
