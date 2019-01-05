// mutations 同步更改状态，只能最多带一个参数，多参数需要包装为一个对象
// 所有state的修改需要通过mutation（实际可以直接修改，但是不推荐），可以添加 strict:true 来限制不能外部修改
// mutation 的触发使用 commit，action 的触发使用 dispatch
// commit=>mutations,触发同步操作
// dispatch=>actions,触发异步操作

export default {
  updateCount (state, { num1, num2 }) {
    state.count = num1 + num2
  }
}
