# vue组件构建为lib ( 非web component )

## 1. webpack 版本

见 `01-webpack`，参考 `vue-loader` 文档，[vue-loader]([https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE](https://vue-loader.vuejs.org/zh/guide/#手动设置))

```
$ npm run build
```

构建的组件的使用

```html
<!-- 动态组件 -->
<div :is="compName"></div>
```

动态载入

```javascript
loadScript('xxx').then(() => {
  Vue.component(compName, window[compName].default);
  this.compName = compName;
})
```

## 02. vue-cli 版本

见 `02-vue-lib`，参考 `vue-cli` 文档，[vue-cli]([https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%94%E7%94%A8](https://cli.vuejs.org/zh/guide/build-targets.html#应用))

```shell
# 将一个单独的入口构建为一个库
$ vue-cli-service build --target lib --name myLib [entry]
```

## 03. vue-cli 版本构建的 lib 的使用

见 `03-test-import-lib`