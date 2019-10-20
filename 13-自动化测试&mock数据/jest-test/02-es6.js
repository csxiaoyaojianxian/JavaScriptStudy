/*
jest 默认不支持 es6，需要使用 babel 来支持 es6

1. 安装babel
$ npm install @babel/core @babel/preset-env -D

2. 配置babel，修改 .babelrc 文件
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
}

*/

function add (a, b) {
    return a + b;
}

function minus (a, b) {
    return a - b;
}

function multi (a, b) {
    return a * b;
}

module.exports = {
    add,
    minus,
    multi
}