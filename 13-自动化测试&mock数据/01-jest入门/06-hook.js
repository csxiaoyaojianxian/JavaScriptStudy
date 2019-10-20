/**
 * 钩子函数 / 分组作用域 / skip跳过
 * 1. describe 分组，可以限定作用域
 * 2. hook  beforeAll / afterAll / beforeEach / afterEach
 * 3. only 用于跳过case
 */
export default class Counter {
    constructor () {
        this.number = 0
    }
    addOne () {
        this.number += 1
    }
    minusOne () {
        this.number -= 1
    }
    addTwo () {
        this.number += 2
    }
    minusTwo () {
        this.number -= 2
    }
}