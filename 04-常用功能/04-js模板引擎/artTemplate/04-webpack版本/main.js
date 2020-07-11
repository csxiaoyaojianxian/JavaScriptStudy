// npm install art-template --save
// 安装 vscode 相关插件

const path = require('path');
const template = require('art-template');
const data = {
    title: '基本例子',
    isAdmin: true,
    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
const html = template(path.resolve(__dirname, 'index.art'), data);
console.log(html);