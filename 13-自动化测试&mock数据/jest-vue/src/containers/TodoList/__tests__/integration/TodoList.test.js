import { mount } from '@vue/test-utils'
import { findTestWrapper } from '@/utils/testUtils'
import TodoList from '@/containers/TodoList/TodoList'
import store from '@/store'

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
