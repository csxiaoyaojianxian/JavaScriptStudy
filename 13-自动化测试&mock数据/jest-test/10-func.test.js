import demoFunction from './10-func'
import Util from './10-es6-class'
/**
 * jest.mock 如果发现是一个类
 * 会自动把构造函数和方法变成 jest.fn() 以提升性能
 */
jest.mock('./10-es6-class')
// 【 相当于执行了 】
// const Util = jest.fn()
// Util.a = jest.fn()
// Util.b = jest.fn()
// 【 还可以传参进行自定义 jest.mock('./10-es6-class', () => {const Util = jest.fn() ... }) 】
// 【 还可以在 __mocks__ 中写对应文件自定义 】


test('测试 demo function', () => {
    demoFunction()
    expect(Util).toHaveBeenCalled()
    expect(Util.mock.instances[0].a).toHaveBeenCalled()
    expect(Util.mock.instances[0].b).toHaveBeenCalled()
    console.log(Util.mock)
/*
    { 
        calls: [ [] ],
        instances: [ Util { a: [Function], b: [Function] } ],
        invocationCallOrder: [ 1 ],
        results: [ { type: 'return', value: undefined } ] 
    }
*/
})