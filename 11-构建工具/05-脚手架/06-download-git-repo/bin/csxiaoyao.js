#!/usr/bin/env node

import download from 'download-git-repo';

// download(仓库地址, 本地存放地址, 选项配置, 回调函数)
// github作者名/仓库名
download('vuejs/awesome-vue', 'project/awesome-vue', {
  // clone: true,
  // proxy: '',
  // headers: {},
  // filter
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});