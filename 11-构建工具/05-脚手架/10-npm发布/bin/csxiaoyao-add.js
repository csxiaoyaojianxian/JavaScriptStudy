#!/usr/bin/env node
// 引入问答交互模块
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// 获取模板文件路径
// console.log(import.meta.url);
const __dirname = path.resolve(); // type=module 时不能直接使用 __dirname
const tpath = path.resolve(__dirname, './csxiaoyao-template.json');

// const csxiaoyaoTpls = await import(tpath);
const csxiaoyaoTpls = require(tpath);

const questions = [
  {
    type: 'input',
    name: 'tpl-name',
    message: '请输入模版名称',
    // 必须输入且不能重复
    validate: (val) => {
      if (val === '') {
        return '模板名称不能为空';
      } else if (csxiaoyaoTpls.filter(v => (v.name === val)).length > 0) {
        return '当前模板已经存在';
      } else {
        return true;
      }
    }
  },
  {
    type: 'input',
    name: 'tpl-url',
    message: '请输入模版地址',
    // 必须输入
    validate: (val) => {
      if (val === '') {
        return '模板地址不能为空';
      } else {
        return true;
      }
    }
  }
];

inquirer
  .prompt(questions).then(answers => {
    console.log(answers);
    // 获取问答内容
    let tplName = answers['tpl-name'];
    let tplUrl = answers['tpl-url'];

    // 更新到 csxiaoyao-template.json 模板文件中
    csxiaoyaoTpls.push({
      name: tplName,
      url: tplUrl,
    });

    // 更新文件内容
    fs.writeFileSync(tpath, JSON.stringify(csxiaoyaoTpls));

  })