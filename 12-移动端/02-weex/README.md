---
style: ocean
---
# weex 学习笔记
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
> 【默认配置的 npm script】
init: 初始化weex项目
build: 源码打包，生成 JS Bundle
dev: webpack watch 模式，方便开发
serve: 开启静态服务器
debug: 调试模式
```
$ npm install -g weex-toolkit
$ weex init awesome-project
# 开启 watch 模式和静态服务器，进入 http://localhost:8080/index.html
$ npm run dev & npm run serve
# 调试
$ weex debug
# 打包
$ weex platform add ios
$ weex run ios
$ weex platform add android
$ weex run android
```
## 3. 其他
### 3.1 集成 iOS SDK
两种方式：1、源码依赖，在github上下载weex源码迁移到工程中；2、安装cocoapods依赖(简单)
```
# (可选)更换ruby源
$ gem sources --remove https://rubygems.org/
$ gem sources -a https://ruby.taobao.org/
$ gem sources -l
# 安装CocoaPods
$ sudo gem install cocoapods
```
使用 Xcode 打开 WeexDemo.xcworkspace，搜索 `DemoDefine.h` 并修改 `CURRENT_IP`
```objective-c
#define CURRENT_IP @"your computer device ip"
// 修改端口号
#define DEMO_URL(path) [NSString stringWithFormat:@"http://%@:8080/%s", DEMO_HOST, #path]
// 修改 JS 文件路径
#define HOME_URL [NSString stringWithFormat:@"http://%@:8080/app.weex.js", DEMO_HOST]
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

### 3.3 安卓应用签名
1. 使用jdk的keytool命令生成keystore，参数-validity为证书有效天数
```bash
keytool -genkey -alias android.keystore -keyalg RSA -validity 100 -keystore android.keystore
```
2. 使用360签名工具签名，使用360加固宝加固
3. 上传到应用市场

![www.csxiaoyao.com](http://www.csxiaoyao.com/src/img/sign.jpg)
