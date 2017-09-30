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

## 2 实战开发 

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

