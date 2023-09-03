# 01-start 创建 csxiaoyao-cli

1. 创建 /bin 文件夹
2. 修改 package.json，添加命令及文件

```
"bin": {
  "csxiaoyao": "./bin/csxiaoyao.js"
},
```

3. 编写csxiaoyao.js代码文件
```
#!/user/bin/env node
```

4. 添加软链接
```
$ sudo npm link
# 取消
$ npm unlink
$ npm link --force
```

5. process.argv 接收命令行参数



