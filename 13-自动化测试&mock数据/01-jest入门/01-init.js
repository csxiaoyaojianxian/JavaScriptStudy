
/*
# 安装
1. 初始化 package.json 并安装 jest
    $ npm init
    $ npm install jest -D

2. 初始化 jest 并根据需要修改生成的配置文件 jest.config.js
    $ npx jest --init

3. 修改 scripts，添加执行指令
    # (1) 普通执行测试
    $ npx jest
    {
        "test": "jest"
    }

    # (2) 生成覆盖率报告
    $ npx jest --coverage
    {
        "coverage": "jest --coverage"
    }

    # (3) 持续监听变化，默认 o 模式
    {
        "test": "jest --watch"
    }

    # (4) 持续监听所有文件变化
    {
        "test": "jest --watchAll"
    }

4. 编写对应测试用例文件 init.test.js 

5. 执行测试
   $ npm run test
   $ npm run coverage
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