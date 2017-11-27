# vue
## 1. 安装
```shell
$ npm i vue -S && npm i vue-loader vue-template-compiler -D
$ npm i vue -S ; npm i vue-loader vue-template-compiler -D
```
## 2. 配置webpack
```
{
    test:/\.vue$/,
    loader:'vue-loader'
}
```
注意：vue-template-compiler是代码上的依赖，不需要配置