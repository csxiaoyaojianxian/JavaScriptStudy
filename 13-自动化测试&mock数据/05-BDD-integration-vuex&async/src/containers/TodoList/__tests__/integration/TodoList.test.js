import { mount } from '@vue/test-utils'
import { findTestWrapper } from '@/utils/testUtils'
import TodoList from '@/containers/TodoList/TodoList'
import store from '@/store'

/**
 * 【1】vuex 测试
 * 1. mount(TodoList, { store })
 */
it(`
  1. 用户会在 header 输入框输入内容
  2. 用户会点击回车按钮
  3. 列表项应该增加用户输入内容的列表项
`, () => {
  // 不能用 shallowMount 渲染，shallowMount 用于单元测试
  // const wrapper = shallowMount(TodoList)
  // 此处要使用 mount 渲染组件树
  const wrapper = mount(TodoList, { store }) // 传入 store
  const inputElem = findTestWrapper(wrapper, 'header-input').at(0)
  const content = 'csxiaoyao'
  inputElem.setValue(content)
  inputElem.trigger('change')
  inputElem.trigger('keyup.enter')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toBe(1)
  // 因为会包含 '-' 删除按钮
  expect(listItems.at(0).text()).toContain(content)
})

/**
 * 【2】异步测试 - 异步接口请求
 * 1. __mocks__/axios.js
 * 2. vm.$nextTick
 * 3. done()
 */
/*
it(`
  1. 用户进入页面时，请求远程数据
  2. 列表应该展示远程返回的数据
`, (done) => {
  const wrapper = mount(TodoList, { store }) // 传入 store
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    // 不能直接判断，因为异步操作在 mounted 之后
    expect(listItems.length).toBe(2)
    done()
  })
})
*/

/**
 * 【3】定时器测试（等待执行）
 * 1. done
 */
/*
it(`
  1. 用户进入页面时，等待 3s
  2. 列表应该展示远程返回的数据
`, (done) => {
  const wrapper = mount(TodoList, { store })
  setTimeout(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(2)
    done()
  }, 3500)
})
*/

/**
 * 【4】定时器测试（跳过等待）
 * 1. jest.useFakeTimers()
 * 2. jest.runAllTimers()
 */
// 保证每个用例的定时器独立
beforeEach(() => {
  jest.useFakeTimers()
})
it(`
  1. 用户进入页面时，等待 3s
  2. 列表应该展示远程返回的数据
`, (done) => {
  const wrapper = mount(TodoList, { store }) // 传入 store
  jest.runAllTimers()
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    // 不能直接判断，因为异步操作在 mounted 之后
    expect(listItems.length).toBe(2)
    done()
  })
})
