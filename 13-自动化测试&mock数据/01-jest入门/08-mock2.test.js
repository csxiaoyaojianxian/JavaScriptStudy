
import { fetchData } from './08-mock2'

// 【1】mock axios 方案
/*
import Axios from 'axios'
jest.mock('axios');
test('测试 fetchData', () => {
    Axios.get.mockResolvedValue({
        data: '(function(){return 123})()'
    })
    return fetchData().then(data => {
        expect(eval(data)).toEqual(123);
    })
})
*/

// 【2】mock 对应方法 方案，异步变同步
// 需要在 __mocks__ 文件夹下建立同名文件
jest.mock('./08-mock2');
// jest.unmock('./08-mock2'); // 取消模拟
test('测试 fetchData', () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual(123);
    })
})

// 【3】automock
// jest.config.js 中打开 automock: true
// 会自动在 __mocks__ 文件夹下找同名文件，省去了手动调用
// jest.mock('./08-mock2');

// 【4】使用 __mocks__ 时部分同步函数仍然使用原文件中的
const { getNumber } = jest.requireActual('./08-mock2')
test('测试 getNumber', () => {
    expect(getNumber()).toEqual(123);
})