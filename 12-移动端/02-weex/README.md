---
style: ocean
---
# weex 踩坑笔记
[toc]
> Write By CS逍遥剑仙
> 我的主页: [www.csxiaoyao.com](http://www.csxiaoyao.com)
> GitHub: [github.com/csxiaoyaojianxian](https://github.com/csxiaoyaojianxian)
> Email: sunjianfeng@csxiaoyao.com
> QQ: [1724338257](wpa.qq.com/msgrd?uin=1724338257&site=qq&menu=yes)

## 1. 常用网址
官网：
[http://weex.apache.org/cn/](http://weex.apache.org/cn/)
Playground：
[http://dotwe.org/vue](http://dotwe.org/vue)

## 2. weex-toolkit
### 2.1 基本命令
> 【默认配置的 npm script】
init: 初始化weex项目
build: 源码打包，生成 JS Bundle
dev: webpack watch 模式，方便开发
serve: 开启静态服务器
debug: 调试模式
```
$ npm install -g weex-toolkit
$ weex init weexdemo
$ cd weexdemo
$ npm install
# 开启 watch 模式和静态服务器，进入 http://localhost:8080/index.html
$ npm run dev & npm run serve
# 调试
$ weex debug
# 安装ios平台和依赖
$ weex platform add ios
$ cd platforms/ios
$ pod install
# 运行并启动模拟器
$ cd ../..
$ weex run ios
$ weex platform add android
$ weex run android
```
### 2.2 配置入口js文件
weex-toolkit脚手架会根据src下的index.vue文件产生一个对应的js文件放到demo目录下，但传统的vue开发一般有个入口文件(main.js或entry.js)用来导入其他模块，进行页面总体配置等操作，可以通过修改webpack.config.js文件实现
1. 添加入口文件配置
```
const entry = {index:pathTo.resolve('src','entry.js?entry=true')};
const weexEntry = {index:pathTo.resolve('src','entry.js?entry=true')};
```
2. 删除多余配置
删除`getEntryFileContent`函数、`walk`函数、`walk()`
3. 在src目录下添加 App.vue
4. 在src目录下添加入口文件`entry.js`，并删除temp目录
```
import App from './App.vue'
new Vue(Vue.util.extend({
	el:'#root'
},App))
```
5. 解决页面无法覆盖整个屏幕，简单修改`WXDemoViewController`原生代码
```
// _weexHeight = self.view.frame.size.height - 64;
_weexHeight = self.view.frame.size.height;
```
## 3. 集成SDK
### 3.1 集成 iOS SDK
#### 3.1.1 使用 ios/playground
```
$ pod install --no-repo-update
```
#### 3.1.2 修改DemoDefine.h文件
1. 修改
```
#define HOME_URL [NSString stringWithFormat:@"http://%@:12580/examples/build/index.js", DEMO_HOST]
```
为
```
#define HOME_URL @"file:///Users/sunshine/Downloads/bundlejs/index.js"
```
2. 修改IP
```
#define CURRENT_IP @"192.168.0.1"
```
#### 3.1.3 去掉navigatebar
在WXDemoViewController.m中添加
```
self.navigationController.navigationBar.hidden = YES;
```
### 3.2 集成 Android SDK
#### 3.2.1 配置adb，`vi ~/.bash_profile`
```config
export ANDROID_HOME=/Users/sunshine/Library/Android/sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools
```
#### 3.2.2 基于wxsample打包jsbundle
1. 下载wxsample，`import project`根据错误提示修复(下载的时候注意关闭代理)
2. 直接`run`
3. 引入新的jsbundle
jsbundle文件路径：`app/src/main/assets/`
修改`LocalActivity.java`中的`hello.js`
4. 默认显示jsbundle的内容
默认页提供了本地加载、网络加载、framework三种方式，修改`AndroidManifest.xml`
```
<activity android:name=".IndexActivity">
</activity>
<activity android:name=".LocalActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
<activity android:name=".NetworkActivity">
</activity>
```
5. 去掉顶部的ActionBar
修改`AndroidManifest.xml`
```
android:theme="@style/AppTheme.NoActionBar"
```
6. 允许下载图片
修改`ImageAdapter`，使用`alt+enter`修复找不到的包
```java
public class ImageAdapter implements IWXImgLoaderAdapter {
  public ImageAdapter() {
  }
  @Override
  public void setImage(final String url, final ImageView view,
                       WXImageQuality quality, WXImageStrategy strategy) {
    WXSDKManager.getInstance().postOnUiThread(new Runnable() {
      @Override
  public void run() {
        if(view==null||view.getLayoutParams()==null){
          return;
        }
        if (TextUtils.isEmpty(url)) {
          view.setImageBitmap(null);
          return;
        }
        String temp = url;
        if (url.startsWith("//")) {
          temp = "http:" + url;
        }
        if (view.getLayoutParams().width <= 0 || view.getLayoutParams().height <= 0) {
          return;
        }
        Picasso.with(WXEnvironment.getApplication())
                .load(temp)
                .into(view);
      }
    },0);
  }
}
```
其中`Picasso`需要在app的`build.gradle`中添加依赖
```
compile 'com.squareup.picasso:picasso:2.5.2'
```
7. 打包apk
打包菜单选项：`Build->Build APK`
apk文件路径：`app/build/outputs/apk/app-debug.apk`

# 4. 其他
### 4.1 安卓应用签名
1. 使用jdk的keytool命令生成keystore，参数-validity为证书有效天数
```bash
keytool -genkey -alias android.keystore -keyalg RSA -validity 100 -keystore android.keystore
```
2. 使用360签名工具签名，使用360加固宝加固
3. 上传到应用市场

### 4.2 vue和we

![www.csxiaoyao.com](http://www.csxiaoyao.com/src/img/sign.jpg)
