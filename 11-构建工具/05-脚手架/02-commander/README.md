# 02-commander

1. 安装commander
```
$ npm install commander -S
```

2. 编写代码查看版本号
```
const { program } = require('commander');
program
  .version('0.0.1')
  .parse(process.argv)
```
查看版本号
```
$ csxiaoyao -h
Usage: csxiaoyao [options]

Options:
  -V, --version  output the version number
  -h, --help     display help for command

$csxiaoyao -V
0.0.1
```

3. 修改帮助文档、配置options参数
```
.usage('<command> [csxiaoyao options]')
.option('命令', '说明', '默认值')
```

4. 获取输入参数

5. 创建命令
```
.command('add', 'add a template')
.command('init', 'init a template')
.command('create [options] <app-name>', 'create a new project powered by xxx')
```


