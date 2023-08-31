#!/usr/bin/env node

import ora from 'ora';

const spinner = ora('开始下载，加载中').start();
spinner.color = 'red';

setTimeout(() => {
  spinner.stop(); // 停止加载
  spinner.succeed('下载成功!');
  // spinner.fail('下载失败');
  // spinner.warn('下载遇到问题');
  // spinner.info('你有一个消息');

}, 2000);