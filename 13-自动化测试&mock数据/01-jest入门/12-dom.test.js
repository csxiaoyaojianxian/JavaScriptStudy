import addDivToBody from './12-dom'

import $ from 'jquery'

/**
 * node 不具备 dom
 * jest 在 node 环境下模拟了 dom api --- jsDom
 */
test('测试 addDivToBody', () => {
    addDivToBody()
    addDivToBody()
    // console.log($('body').find('div').length)
    expect($('body').find('div').length).toBe(2)
})