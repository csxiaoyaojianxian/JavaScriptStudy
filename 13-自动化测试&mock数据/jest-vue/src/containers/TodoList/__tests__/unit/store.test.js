import store from '@/store'

it(`当 store 接受 changeInputValue 的 commit 时，inputValue 发生变化`, () => {
  const value = '123'
  store.commit('changeInputValue', value)
  expect(store.state.inputValue).toBe(value)
})
