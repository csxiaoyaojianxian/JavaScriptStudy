import Vue from 'vue'

// 本实例中有三个组件：孙子组件、子组件、父组件

// 孙子组件
const ChildComponent = {
  // 输出跨级父组件的内容 value
  template: '<div>child component: {{data.value}}</div>',
  // 用于与父组件交互，传入跨级父组件的数据
  inject: ['yeye', 'data'],
  mounted () {
    // this.$parent 为comp组件（子组件）
    console.log(this.$parent.$options.name, this.yeye, this.value)
  }
}

// 子组件
const component = {
  name: 'comp',
  components: {
    ChildComponent // 插入孙子组件
  },
  template: `
    <div>
      <child-component />
    </div>
  `,
  data () {
    return {
      value: 'component value'
    }
  }
}

// 父组件
new Vue({
  components: {
    CompOne: component
  },
  // 用于父组件和跨级孙子组件交互，不推荐，将来版本升级可能会被取代
  provide () {
    const data = {}
    // 用于支持孙子组件的数据双向绑定，也是vue双向数据绑定的核心
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <input type="text" v-model="value" />
    </div>
  `
})
