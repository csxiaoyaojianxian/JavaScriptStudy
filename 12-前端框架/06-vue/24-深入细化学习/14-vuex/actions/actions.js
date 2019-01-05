// action 也是用于修改数据，但是与mutations不同，可以为异步
// 只能传递一个参数，多参数需要包装为一个对象
// action 的触发使用 dispatch，mutation 的触发使用 commit
// 同步的可以直接用mutations，异步的必须用actions
// commit=>mutations,触发同步操作
// dispatch=>actions,触发异步操作

export default {
  // 异步action，调用同步mutation，data为包装了多个参数的参数对象
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
