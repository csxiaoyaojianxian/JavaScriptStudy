import Counter from './06-hook'

// 【 describe 】 分组，可以限定作用域
describe('测试分组和钩子函数', () => {
    let counter = null

    // 【 钩子函数 hook 】 beforeAll / afterAll / beforeEach / afterEach
    beforeAll(() => {
        console.log('beforeAll')
    })
    afterAll(() => {
        console.log('afterAll')
    })
    beforeEach(() => {
        console.log('beforeEach')
        // 实例化
        counter = new Counter()
    })
    afterEach(() => {
        console.log('afterEach')
    })

    // 分组1
    describe('测试增加相关的代码', () => {
        // 使用 describe 限定作用域，该 beforeEach 不会对后面的同级 describe 产生影响
        beforeEach(() => {
            console.log('beforeEach test add')
        })
        // 【 only 】 用于跳过 case
        test.only('测试 Counter 的 addOne 方法', () => {
            console.log('case1')
            counter.addOne()
            expect(counter.number).toBe(1)
        })
        test('测试 Counter 的 addTwo 方法', () => {
            console.log('case2')
            counter.addTwo()
            expect(counter.number).toBe(2)
        })
    })

    // 分组2
    describe('测试减少相关的代码', () => {
        test('测试 Counter 的 minusOne 方法', () => {
            console.log('case3')
            counter.minusOne()
            expect(counter.number).toBe(-1)
        })
        test('测试 Counter 的 minusTwo 方法', () => {
            console.log('case4')
            counter.minusTwo()
            expect(counter.number).toBe(-2)
        })
    })
})