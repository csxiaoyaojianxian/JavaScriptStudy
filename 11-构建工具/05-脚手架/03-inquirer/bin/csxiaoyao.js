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
  // 级联
  {
    type: 'confirm',
    message: '是否使用批量监听模式',
    name: 'more-watch',
    when: (answers) => { // when
      if (answers.watch) {
        return true;
      } else {
        return false; // answers中不包含此字段
      }
    }
  },
  // 单选
  {
    type: 'list',
    message: '请选择一种单页面前端技术',
    name: 'technology',
    // default: 'react',
    choices: ['vue','react','angular'],
  },
  // 多选
  {
    type: 'checkbox',
    message: '爱好',
    name: 'hobby',
    choices: ['唱歌', '跳舞', '绘画'],
    pageSize: 2, // 分页
  },
  // 密码
  {
    type: 'password',
    message: '请输入密码',
    name: 'pwd',
  },
  // 使用编辑器
  {
    type: 'editor',
    message: '请输入备注文本',
    name: 'editor-content',
  }
];

// 2. 获取问题回答答案
inquirer.prompt(promptList).then(answers => {
  console.log(answers);
});