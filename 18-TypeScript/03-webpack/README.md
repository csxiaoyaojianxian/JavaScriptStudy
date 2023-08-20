
```
$ npm init
$ npm i -D webpack webpack-cli typescript ts-loader
...
$ npm run build

$ npm i -D html-webpack-plugin
$ npm i -D webpack-dev-server
$ npm i -D clean-webpack-plugin

$ npm i -D @babel/core @babel/preset-env babel-loader core-js
```

ts设置target只能处理简单语法的兼容，引入babel+corejs可以支持如promise等语法的处理