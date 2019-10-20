import { runCallback, createObject, getData } from './07-mock'
import axios from 'axios'

/**
 * mock作用：
 * 1. 捕获函数的调用和返回结果，以及this和调用顺序
 * 2. 自由设置返回结果
 * 3. 改变函数内部实现
 */
test('测试 callback 是否被执行', () => {
    // 使用 jest 生成一个 mock 函数，用来捕获函数调用
    const func1 = jest.fn()

    // 模拟返回数据
    func1.mockReturnValueOnce(456).mockReturnValueOnce(789)
    // func1.mockReturnValue(10)

    // 定义带返回的mock函数
    const func2 = jest.fn(() => { return 456 })
    // 等价于
    func2.mockImplementation(() => { return 456 })
    // func2.mockImplementationOnce(() => { return this })
    // func2.mockReturnThis

    // 执行3次func1，1次func2
    runCallback(func1)
    runCallback(func1)
    runCallback(func1)
    runCallback(func2)

    // 被执行
    expect(func1).toBeCalled()
    // 调用次数
    expect(func1.mock.calls.length).toBe(3)
    // 传入参数
    expect(func1.mock.calls[0]).toEqual([123])
    expect(func1).toBeCalledWith(123)
    // 返回结果
    expect(func2.mock.results[0].value).toBe(456)

    // 输出mock
    console.log(func1.mock)
/*
    { 
        calls: [ [ 123 ], [ 123 ], [ 123 ] ],
        instances: [ undefined, undefined, undefined ],
        invocationCallOrder: [ 1, 2, 3 ],
        results: [ 
            { type: 'return', value: 456 },
            { type: 'return', value: 789 },
            { type: 'return', value: undefined } 
        ]
    }
*/
})

test('测试 createObject', () => {
    const func = jest.fn()
    createObject(func)
    console.log(func.mock)
/*
    { 
        calls: [ [] ],
        instances: [ mockConstructor {} ],
        invocationCallOrder: [ 1 ],
        results: [ 
            { type: 'return', value: undefined } 
        ]
    }
*/
})

// jest 模拟 axios 请求
jest.mock('axios')
test('测试 axios getData', async () => {
    // 模拟函数的返回，getData 不会真正发起 axios 请求
    axios.get.mockResolvedValueOnce({ data: 'hello' })
    axios.get.mockResolvedValueOnce({ data: 'world' })
    // axios.get.mockResolvedValue({ data: 'hello' })
    await getData().then((data) => {
        expect(data).toBe('hello')
    })
    await getData().then((data) => {
        expect(data).toBe('world')
    })
})