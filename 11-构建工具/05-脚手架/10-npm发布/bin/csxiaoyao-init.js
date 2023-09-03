#!/usr/bin/env node

import { program } from 'commander';
import download from 'download-git-repo';
import ora from 'ora';
import fs from 'fs';
import chalk from 'chalk';

import { createRequire } from "module";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // type=module时 __dirname 不可直接使用

const require = createRequire(import.meta.url);
const csxiaoyaoTpls = require(path.resolve(__dirname, '../csxiaoyao-template.json'));

// 定义 csxiaoyao init <template-name> [project-name]
program
  .usage('<template-name> [project-name]')
  .parse(process.argv)

// 参数校验，如直接使用 csxiaoyao init 则会提示 help;
if (program.args.length < 1) {
  program.help();
}

// 获取用户输入参数
let tName = program.args[0];
let pName = program.args[1];

if (csxiaoyaoTpls.filter(v => tName === v.name).length === 0) {

  console.log(chalk.red('模板名称不存在，请使用 csxiaoyao list 命令查看可输入的模板'));

} else if (!pName) {
  
  console.log(chalk.red('项目名称不能为空'));
  
} else if (!pName) {
  
  console.log(chalk.red('项目名称不能为空'));
  
} else {

  // 获取模板地址
  let url = csxiaoyaoTpls.filter(v => tName === v.name)[0].url;

  // 开始创建项目
  console.log(chalk.yellow('开始创建项目'));

  // 出现加载图标
  const spinner = ora('下载拉取中...');
  spinner.start();

  // 传入参数，进行下载
  download(url, pName, err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red('创建项目失败' + err));
      return;
    }
    // 成功加载
    spinner.succeed();
    console.log(chalk.green('创建目录成功'));
    console.log('\n to start');
    console.log(`cd ${pName}`);
  });
}
