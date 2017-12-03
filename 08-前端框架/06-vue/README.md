# vue
## 1. 安装
```shell
# 根据系统选择使用 && / ;
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
## 3. 安装组件
```
# 安装mint-ui，如果打包出错，检查webpack的css相关loader
$ npm install mint-ui -S
# 安装vue-router
$ npm i vue-router -S
# 安装Axios
$ npm i axios -S
# 其他
$ npm i vue-preview monent - S
```