// hello.js

// 测试用例在 test/hello-test.js

// 执行方法
// 1. 当前目录下执行 node_modules/mocha/bin/mocha
// 2. package.json 添加命令 "test": "mocha"
//    npm test

module.exports = function (...rest) {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};