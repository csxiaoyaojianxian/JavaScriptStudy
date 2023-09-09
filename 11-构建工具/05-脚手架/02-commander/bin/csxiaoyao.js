#!/usr/bin/env node

/**
 * 原生方式
 */
// process.argv.forEach(v => {
//   console.log(v);
// });

const { program } = require('commander');
program
  .version('0.0.1')
  .usage('<command> [csxiaoyao options]')
  .option('-cr, --classroom <custom classroom\'s name>', 'current classroom name') // '命令', '说明', '默认值'
  .command('add', 'add a template')
  .command('init', 'init a template')
  .command('create [options] <app-name>', 'create a new project powered by xxx')
  .parse(process.argv)

// 获取输入参数
console.log(program.opts().classroom);

