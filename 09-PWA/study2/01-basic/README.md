# 项目DEMO——一个基础的Web App
为了配合PWA中相关知识的学习，我专门创建了一个demo Web App——

一个根据关键字查询图书信息的demo。

这个Web App最开始是不具备任何PWA的能力。我会在这一系列文章中以这个demo为例，阐述各项技术的同时，将其应用在demo上。也就是说，在这一系列的文章中，我会和大家一起将一个普通的网页应用逐步升级为一个简单的PWA，通过这种方式一起学习。

首先简单介绍一下这个demo。这是一个根据关键词搜索图书信息的应用，用户在前端输入关键词，点击搜索，会请求我们自己的服务器，而服务器使用[豆瓣图书API V2](https://developers.douban.com/wiki/?title=book_v2)来获取数据。

![图书搜索demo](https://upload-images.jianshu.io/upload_images/6476654-61e8e1ee38c99d84.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

项目使用[KOA](http://koajs.com/)来搭建node服务器，所以需要node版本>7.6.0，可以使用[nvm](https://github.com/creationix/nvm)来切换到适合的node版本。

要运行该项目，首先
```bash
git clone git@github.com:alienzhou/learning-pwa.git
# 切换到基础项目分支
git checkout basic
```
注意，需要切换到basic分支，master分支是上经过PWA升级后最新的demo代码。只有在basic分支才能看到原始的Web App。接下来，安装依赖：
```
npm install
```
最后，运行项目：
```
npm run start
```
然后就可以在`127.0.0.1:8085`上访问到该项目。

基础demo的代码比较简单，这里就不去赘述demo中的代码细节了。简单了解一下项目结构，前端代码都存放于`public`目录中，具体结构如下：
```
|---public---|---index.html // 前端页面
|            |---index.js // browser的JavaScript脚本
|            |---style.css // 样式文件
|            |---img // 图片文件夹
|---app.js // node服务启动入口
|---util.js // node服务工具库
```

值得一提的是，后续文章内的代码会以分支的形式存在，每篇文章的最终代码会存放于一个对应的分支中。你可以通过方便得切换分支，来查看每篇文章对应的示例代码。

- basic分支：基础项目demo，一个普通的图书搜索应用（网站）；
- manifest分支：基于basic分支，添加manifest等功能；
- sw-cache分支：基于manifest分支，添加缓存与离线功能；
- master分支：应用的最新代码。
- ……
