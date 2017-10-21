# react-native 学习笔记

By CS逍遥剑仙  2017.09.21

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

**1.8 修改下载源**

使用淘宝的 `NPM` 下载源, 可以加快下载速度

```Shell
$ npm config set registry=http://registry.npm.taobao.org/
```

配置地址在根目录的 `.npmrc` 中, 即

```
registry=http://registry.npm.taobao.org/
```

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

## 4 列表页开发

**1 报错解决**

`Navigator is deprecated and has been removed from this package. It can now be installed and import from ‘react-native-deprecated-custom-components’ instead of ‘react-native’.`

```Shell
$ npm i react-native-deprecated-custom-components --save
```

**2 navigator**

通过 push 和 pop 页面，实现页面的跳转

**3 视频播放插件**

```Shell
$ npm i -S react-native-video
$ react-native link
$ rnpm link react-native-video
```

**4 按钮**

```Shell
$ npm i react-native-button --save
```

**5 本地异步存储 - AsyncStorage**

## 5 RN知识点

```Shell
$ git clone https://github.com/facebook/react-native.git
$ cd react-native
$ git checkout 0.24-stable
$ rm -rf node_modules && npm install
```

通过xcode启动Example/UIExplorer，查看组件

> 新版本改名为 RNTester

**常用组件**

`View`、`Text`、`TextInput`、`Image`、`AlertIOS`、`Modal`、`ActivityIndicatorIOS`、`ProgressViewIOS`、`ListView`、`PickerIOS`、`DatePickerIOS`、`StatusBarIOS`、`Switch`、`Slider`、`MapView`、`Navigator`、`TabBarIOS`、`SegmentedControlIOS`、`Touchable`、`WebView`

## 6 手机展示原型

1. iPhone连接Mac，确保处在同一WiFi下

2. 找到本地IP地址

   ```Shell
   $ ifconfig
   ```

   ​

