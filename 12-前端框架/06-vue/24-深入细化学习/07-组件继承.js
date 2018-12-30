import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}
const CompVue = Vue.extend(compoent) // 继承方式1
new CompVue({
  el: '#root',
  propsData: { // 传递参数给compoent的props，不能直接用props
    propOne: 'xxx'
  },
  data: {
    text: '123'
  },
  mounted () {
    console.log('instance mounted')
  }
})


const parent = new Vue({
  name: 'parent'
})
const componet2 = {
  extends: compoent,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}
new Vue({
  parent: parent, // 继承方式2
  name: 'Root',
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name) // 输出父组件的内容
  },
  components: {
    Comp: componet2
  },
  data: {
    text: 23333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `
})
