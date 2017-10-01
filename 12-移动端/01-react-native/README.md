# react-native 学习笔记

## 1 安卓和ios环境配置

**1.1 安装 `watchman` 和 `flow`**

```shell
$ brew install watchman flow
```

**1.2 安装 `xcode`**

```Shell
$ xcode-select --install
```

**1.3 安装 `react-native`**

```Shell
$ npm install -g react-native-cli@0.1.10 -g
```

**1.4 新建项目**

```Shell
$ react-native init test
$ react-native run-ios
$ react-native run-android
```

**1.5 配置安卓**

在项目下的 `android/` 文件夹内创建 `local.properties` :

```config
sdk.dir = /Users/USERNAME/Library/Android/sdk
```

或添加系统环境变量

```config
export ANDROID_HOME=/Users/<username>/Library/Android/sdk/
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

**1.6 几个相关的sublime插件**

`babel`、`sublimelinter-jsxhint` (view->syntax->babel->javascript)、`gitgutter`、`sublimelinter-contrib-eslint`

**1.7 debugger-ui**

呼出方式：`cmd`+`d`

浏览器访问地址：http://localhost:8081/debugger-ui



## 2 实战开发 

![react生命周期](pic/react生命周期.png)

TabBarIOS组件

安装图标库

```Shell
$ npm install react-native-vector-icons@2.0.2 --save
```

安装rnpm

```Shell
$ npm install rnpm@1.7.0 -g
```

链接

```Shell
$ rnpm link react-native-vector-icons
```

## 3 Mock 假数据

**3.1 rap 配置返回数据规则**

[http://rapapi.org](http://rapapi.org) rap 配置规则

![rap-mock假数据](pic/rap-mock假数据.png)

**3.2 解决 Image 网络图片不显示问题**

IOS 9以上的设备因为`App Transport Security`会拒绝所有不通过HTTPS发送的HTTP请求，需要在`Info.plist`进行ATS设置，`App Transport Security Settings`下新建`Allow Arbitrary Loads`条目，并设置值为`YES`

![解决Image网络图片不显示问题01](pic/解决Image网络图片不显示问题01.png)

![解决Image网络图片不显示问题01](pic/解决Image网络图片不显示问题02.png)

**3.3 mockjs**

[http://mockjs.com](http://mockjs.com) 解析 json

 安装 mockjs

```Shell
$ npm install mockjs --save
```

**3.4 删除 mockjs 中 dataImage 方法**

路径

```
node_modules/mockjs/dist/mock.js
```

**3.5 安装 query-string & lodash**

```Shell
$ npm install query-string --save
$ npm install lodash --save
```

