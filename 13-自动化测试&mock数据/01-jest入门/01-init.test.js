
const math = require('./01-init.js');
const {add, minus, multi} = math;

// 断言
test('测试加法 3 + 7', () => {
    expect(add(3, 7)).toBe(10);
})

test('测试减法 3 - 3', () => {
    expect(minus(3, 3)).toBe(0);
})

test('测试乘法 3 * 3', () => {
    expect(multi(3, 3)).toBe(9);
})