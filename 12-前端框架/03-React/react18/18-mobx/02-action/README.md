# 装饰器环境配置

## 1. 配置vscode

...

## 2. 配置babel

```shell
$ npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env
```

创建 .babelrc

```js
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
```

## 3. 配置脚本

```shell
$ npm i customize-cra react-app-rewired
```

`config-overrides.js`

```js
const path = require('path');
const { override, addDecoratorsLegacy } = require('customize-cra');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src')
  if (env === 'production') {
    config.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  }
  return config
};

module.exports = override (addDecoratorsLegacy(), customize ())
```

`package.json`

```
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
},
```

## 4. 函数式组件 & 取消订阅

存在销毁又创建的组件需要注意取消订阅

见 Fun.js