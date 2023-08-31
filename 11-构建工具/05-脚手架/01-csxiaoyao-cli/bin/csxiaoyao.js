#!/usr/bin/env node
console.log('hello world');

/**
 * [ process.argv ]  return Array
 * 返回参数1: node.js可执行文件的绝对路径
 * 返回参数2: 正在执行的javascript文件路径
 * 返回参数3开始: 通过命令行传递的参数
 */
process.argv.forEach(v => {
  console.log(v);
});