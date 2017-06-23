# npm常用命令总结

## 1 npm升级

```
$ sudo npm install npm -g
```

淘宝镜像

```
$ sudo npm install cnpm -g
```

## 2 模块

**安装模块**

```
# 安装nodejs的express框架
$ npm install express
# 若出现错误 npm err! Error: connect ECONNREFUSED 127.0.0.1:8888 
$ npm config set proxy null
# 查看所有全局安装的模块
$ npm list -g
# 查看某个模块的版本号
$ npm list express
```

**卸载模块**

```
$ npm uninstall express
```

**更新模块**

```
$ npm update express
```

**搜索模块**

```
$ npm search express
```

**创建模块**

```
# 使用 NPM 生成 package.json 文件
$ npm init
# 在 npm 资源库中注册用户（邮箱）
$ npm adduser
Username: csxiaoyao
Password:
Email: (this IS public) 1724338257@qq.com
```

**发布模块**

```
$ npm publish
```

## 3 package.json

- **name** - 包名
- **version** - 包的版本号
- **description** - 包的描述
- **homepage** - 包的官网 url 
- **author** - 包的作者姓名
- **contributors** - 包的其他贡献者姓名
- **dependencies** - 依赖包列表，如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下
- **repository** - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上
- **main** - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")
- **keywords** - 关键字

## 4 其他命令

清空 npm 本地缓存

```
$ npm cache clear
```

撤销发布

```
$ npm unpublish <package>@<version>
```