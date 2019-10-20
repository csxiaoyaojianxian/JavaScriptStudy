import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const root = document.createElement('div')
    root.className = 'root'
    document.body.appendChild(root)
    new Vue({
      render: h => h(HelloWorld, {
        props: {
          msg: 'csxiaoyao'
        }
      })
    }).$mount('.root')
    // console.log(document.body.innerHTML)
    expect(document.getElementsByClassName('hello').length).toBe(1)
  })

  it('renders props.msg when passed', () => {
    const msg = 'csxiaoyao'
    // shallowMount 浅渲染，不渲染子组件，提升性能，适合单元测试
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    console.log(wrapper.props('msg'))
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.findAll('.cs').length).toBe(1)
  })

  it('组件渲染正常', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg: 'csxiaoyao' }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
