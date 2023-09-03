#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';

import { createRequire } from "module";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // type=module时 __dirname 不可直接使用

const require = createRequire(import.meta.url);
const csxiaoyaoTpls = require(path.resolve(__dirname, '../csxiaoyao-template.json'));

const questions = [
  {
    type: 'input',
    name: 'tpl-name',
    message: '请输入要删除的模版名称',
    validate: (val) => {
      if (val === '') {
        return '模板名称不能为空';
      } else if (csxiaoyaoTpls.filter(v => (v.name === val)).length === 0) {
        return '当前要删除的模板不存在';
      } else {
        return true;
      }
    }
  },
];

inquirer
  .prompt(questions).then(answers => {
    let tplName = answers['tpl-name'];
    // 更新文件内容
    fs.writeFileSync(tpath, JSON.stringify(csxiaoyaoTpls.filter(v => v.name !== tplName)));

    console.log(chalk.green('删除成功'));
  })