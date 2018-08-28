/*
// 测试同步函数
it('test sync function', function () {
    // TODO:
    assert(true);
});

// 测试异步函数，需要传入参数，通常命名为done
it('test async function', function (done) {
    fs.readFile('filepath', function (err, data) {
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});
// 使用ES7的async编写的函数
it('#async with done', (done) => {
    (async function () {
        try {
            let r = await hello();
            assert.strictEqual(r, 15);
            done();
        } catch (err) {
            done(err);
        }
    })();
});

// 终极方案
it('#async function', async () => {
    let r = await hello();
    assert.strictEqual(r, 15);
});

*/

const assert = require('assert');

const ex = require('../02-hello-async');

describe('#hello.js', () => {

    describe('#ex()', () => {

        it('#async function', async () => {
            let r = await ex();
            assert.strictEqual(r, 15);
        });
        
    });
});

