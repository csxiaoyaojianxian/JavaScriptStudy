# Weex Loader

A webpack loader for Weex.

## Install

```
npm install weex-loader babel-loader --save
```

## Features

0. Can load `.we` file.
0. Can load parted files(`.js/.css/.html`) via `src` attribute.
0. Can specify a custom language to chain any loader.
0. Can specify name when require `.we` file.
0. Can write es2015 in script.

## Upgrade to v0.3

- Use a different way to load parted files. The old way is deprecated.
- If you dependent `weex-components` under v0.1, please update it to v0.2.
- Just enjoy the new features!
- Use some hack way to require `@weex-module/xxxx` in `.js` file. see [issue](https://github.com/weexteam/weex-loader/issues/18#issuecomment-245204349)

## Usage

### How to load a `.we` file.

**make a webpack config**
```javascript
module.exports = {
  entry: './main.we?entry',
  output: {
    path: './dist',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex'
      }
    ]
  }
};
```

### How to write parted files

**specify `src` attribute**
```html
<template src="./main.html"></template>
<style src="./main.css"></style>
<script src="./main.js"></script>
```

### add some custom language for loaders

**append a weex config in webpack config**
```javascript
  weex: {
    lang: {
      jade: ['jade-html'] // a jade langauge will chain "jade-html-loader"
    }
  }
```

**main.we**
```
<template lang="jade">
div
  text Hello Weex
</template>
```

### How to require `.we` file as component element

0. first, require a `path/to/component.we` in `script` like `require('./foo.we')` or write inline element like `<element name="foo" src="./foo.we"></element>`.
1. second, use it in `template` like `<foo></foo>`.

```
<element name="foo" src="./foo.we"></element>

<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
  require('./bar.we')
</script>
```

### How to specify the name of a component

0. By default, the name is the basename without extname of component path.
1. Give a name query in require request, like `require('./foo.we?name="fooo"')`. Or specify a name attribute in element, like `<element name="fooo" src="./foo.we" ></element>`
2. use the name in `template` like `<fooo></fooo>`.

```
<element name="fooo" src="./foo.we"></element>

<template>
  <div>
    <fooo></fooo>
    <baar></baar>
  </div>
</template>

<script>
  require('./bar.we?name=baar')
</script>
```

## Test

```bash
npm run test
```
will run mocha testing.

And you can check the specs in `test/spec` folder.

## Specs

- [Build with single template tag](test/spec/a.we)
- [Build with template and style tags](test/spec/b.we)
- [Build with template/style/script tags](test/spec/c.we)
- [Build with single element tag](test/spec/d.we)
- [Build with multiple element tag](test/spec/e.we)
- [Build from parted files specifed in `src` attr](test/spec/f.we)
- [Manually Require component and specifies an alias name](test/spec/g.we)
- [Automaticely require component under some folder](test/spec/h.we)
- [Build with config/data tag](test/spec/i.we)
- [Require weex module](test/spec/j.we)
- [Build by using custom language](test/spec/k.we)
- [Require commonjs module](test/spec/l.we)
- [Require weex module in commonjs module](test/spec/m.we)
- [Build with sourcemap(no test)](test/spec/n.we)
- [Build weex examples](test/spec/o.we)

## Knew Issues

- [`Bug` Source Map Offset](https://github.com/webpack/webpack/issues/2145). Encoding to this problem, please use `devtool:"eval-source-map"` instead of `devtool:"source-map"`.
- [`Bug` Can't set debugger breakpoint](#). I still don't know the reason, but you can debug with `debugger` keyword.





