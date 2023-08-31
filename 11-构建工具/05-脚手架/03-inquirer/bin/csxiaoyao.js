#!/usr/bin/env node

// const inquirer = require('inquirer');
import inquirer from 'inquirer';

// 定义基本的问答结构
// 1. 定义问题列表
const promptList = [
  // 输入
  {
    type: 'input',
    message: '请输入6位数字ID',
    name: 'id', // key
    default: '123456',
    validate: (val) => {
      if (val.match(/^\d{6}$/ig)) {
        return true;
      }
      return '请输入6位数字的ID～～～';
    }
  },
  // 是/否选择
  {
    type: 'confirm',
    message: '是否使用监听模式',
    name: 'watch',
    prefix: '🌹', // 前缀
    suffix: '🇨🇳', // 后缀
    default: false,
  },
  // 
  {

  }
];

// 2. 获取问题回答答案
inquirer.prompt(promptList).then(answers => {
  console.log(answers);
})