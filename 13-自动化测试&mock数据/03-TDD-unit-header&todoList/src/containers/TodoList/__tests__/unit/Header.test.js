import { shallowMount } from '@vue/test-utils'
import Header from '@/containers/TodoList/components/Header'
// 封装的方法
import { findTestWrapper } from '@/utils/testUtils'

it('Header 样式发生改变，提示', () => {
  const wrapper = shallowMount(Header)
  expect(wrapper).toMatchSnapshot()
})

it('Header 包含 input 框', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  expect(input.exists()).toBe(true)
})

it('Header 中 input 框初始内容为空', () => {
  const wrapper = shallowMount(Header)
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('')
})

it('Header 中 input 框值发生变化，数据跟随变化', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('csxiaoyao')
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('csxiaoyao')
})

it('Header 中 input 框输入回车，无内容时无反应', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('')
  input.trigger('keyup.enter')
  // 为空时不应该触发 add 事件
  expect(wrapper.emitted().add).toBeFalsy()
})

it('Header 中 input 框输入回车，有内容时触发事件', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('csxiaoyao')
  input.trigger('keyup.enter')
  // 不为空时应该触发 add 事件
  expect(wrapper.emitted().add).toBeTruthy()
})

it('Header 中 input 框输入回车，有内容时触发事件，同时清空 inputValue', () => {
  const wrapper = shallowMount(Header)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('csxiaoyao')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeTruthy()
  expect(wrapper.vm.$data.inputValue).toBe('')
})
