import timer from './09-mock-timer'

/**
 * 需要等定时器执行，时间长
 */
// test('测试 timer', (done) => {
//     timer(() => {
//         expect(1).toBe(1)
//         done()
//     })
// })

/**
 * 使用 useFakeTimers / runAllTimers / runOnlyPendingTimers / advanceTimersByTime
 * 缩短 timers 时间
 */
// 各个用例之间定时器不影响
beforeEach(() => {
    jest.useFakeTimers()
})
test('测试 timer', () => {
    const fn = jest.fn()
    timer(fn)

    // * 定时器立即执行
    // jest.runAllTimers() // 执行2次
    // * 只运行队列中的timer
    // jest.runOnlyPendingTimers() // 执行1次
    // * 快进x
    jest.advanceTimersByTime(3000) // 快进3s

    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(3000) // 再快进3s
    expect(fn).toHaveBeenCalledTimes(2)
})