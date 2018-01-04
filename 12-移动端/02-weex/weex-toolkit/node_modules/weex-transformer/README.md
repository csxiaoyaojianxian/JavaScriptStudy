# Weex DSL Transformer

[![NPM version][npm-image]][npm-url]
[![Build status][circle-image]][circle-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/weex-transformer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/weex-transformer
[circle-image]: https://circleci.com/gh/alibaba/weex_toolchain.svg?style=svg
[circle-url]: https://circleci.com/gh/alibaba/weex_toolchain/tree/master
[downloads-image]: https://img.shields.io/npm/dm/weex-transformer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/weex-transformer

`<template>` + `<style>` + `<script>` + `<element>`

## Install

```bash
npm install weex-transformer
```

## Usage

### CLI tool

```
  Usage: transformer [options] <file...>

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -g, --logLevel [value]   specify log output level - `NOTE`, `WARNING`, `ERROR`, `OFF` (default: `NOTE`, equivalent to `ALL`)
    -e, --isEntry [value]    whether is an entry module which has `bootstrap` (default: true)
    -l, --oldFormat [value]  whether to transform to old format (default: false)
    -o, --output [path]      the output file dirname
```

### API

#### `transform(name, code, path, elements, config)`

```javascript
var transformer = require('weex-transformer')
var output = transformer.transform('foo', '/* code here */', '.', {})
```

##### params

- `name`: string, current bundle name
- `code`: string, source code
- `path`: string *optional*, useful when find custom component in a certain path
- `elements`: object *optional*, existed custom component map
- `config`: object *optional*
    * `logLevel`: specify log output level - `NOTE` (default, equivalent to `ALL`), `WARNING`, `ERROR`, `OFF`, aranging from low to high
    * `isEntry`: whether is an entry module which has `bootstrap` (default: true)
    * `oldFormat`: whether to transform to old format (default: false)

##### returns

- an object with keys
    * `result`: string, all custom components `define()` and final `bootstrap()`
    * `logs`: array, corresponding warning & error logs

#### `transformOld(...)`

same params and different output format for old style: `register(name, options)` and `render(name, data)`

## transforming content

- `template`: JavaScript Object by `parse5`
- `style`: JSON Object by `css`
- `script`: JavaScript AST with `template`, `deps`, `style` by `esprima`
- `element`: string code map for deeply parsing

## workflow

1. get template, style, script, elements
2. parse and validate style by `styler`
3. parse and validate template by `templater` and get deps
4. parse script by `scripter`
5. join template, style and script to build a module
6. collect element code map
7. output `define()` string code, deps, element code map and logs
8. find deps code by name from element code map first and from file system for second
9. join all deps code together recursively
10. find all required 3rd party javascript and bundle them
11. append `bootstrap()` string code and bundle at last
