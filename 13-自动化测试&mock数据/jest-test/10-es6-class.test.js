import Util from './10-es6-class'

/**
 * 常规 es6-class 测试
 * 重点关注 func.test.js 模拟 Util class
 */
let util = null
beforeAll(() => {
    util = new Util()
})

test('测试 a 方法', () => {
    expect(util.a(1,2)).toBe(3)
})