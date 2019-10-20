import { shallowMount } from '@vue/test-utils'
import TodoList from '@/containers/TodoList/TodoList'
import Header from '@/containers/TodoList/components/Header'

it('TodoItem 初始化时，undoList 应该为空', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([])
})

it('TodoItem 执行 addItem 时会增加一个内容', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.vm.addUndoItem('csxiaoyao')
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual(['csxiaoyao'])
})

it('TodoList 监听到 Header 的 add 事件时会增加一个内容', () => {
  const content = 'csxiaoyao'
  const wrapper = shallowMount(TodoList)
  const header = wrapper.find(Header)
  header.vm.$emit('add', content)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([content])
})
