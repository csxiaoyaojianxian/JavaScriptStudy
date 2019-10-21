import { shallowMount } from '@vue/test-utils'
import TodoList from '@/containers/TodoList/TodoList'
import UndoList from '@/containers/TodoList/components/UndoList'

describe('TodoList 组件', () => {
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

  it('TodoList 中 addUndoItem 被执行后，内容会增加一项', () => {
    // const content = 'csxiaoyao'
    // const wrapper = shallowMount(TodoList)
    // const header = wrapper.find(Header)
    // header.vm.$emit('add', content)
    // const undoList = wrapper.vm.$data.undoList
    // expect(undoList).toEqual([content])

    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [1, 2, 3]
    })
    wrapper.vm.addUndoItem(4)
    expect(wrapper.vm.$data.undoList).toEqual([1, 2, 3, 4])
  })

  it('UndoList 调用 UndoList，应该传递 list 参数', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.find(UndoList)
    const list = undoList.props('list')
    expect(list).toBeTruthy()
  })

  it('UndoList 中 hanleDeleteItem 方法被调用时，UndoList 列表内容会减少', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [1, 2, 3]
    })
    wrapper.vm.handleItemDelete(1)
    expect(wrapper.vm.$data.undoList).toEqual([1, 3])
  })
})
