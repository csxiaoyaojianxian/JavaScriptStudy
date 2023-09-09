# 07-创建脚手架命令

1. 创建命令可执行文件并绑定在 package.json
```
"csxiaoyao": "./bin/csxiaoyao.js",
"csxiaoyao-add": "./bin/csxiaoyao-add.js",
"csxiaoyao-list": "./bin/csxiaoyao-list.js",
"csxiaoyao-delete": "./bin/csxiaoyao-delete.js",
"csxiaoyao-init": "./bin/csxiaoyao-init.js"
```

2. 链接
```
$ npm link
```

3. 使用命令
```
$ csxiaoyao add
$ csxiaoyao-add
```