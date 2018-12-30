import Vue from 'vue'

const compoent = {
  props: {
    active: {
      // type: Boolean,
      // required: true,
      validator (value) {
        return typeof value === 'boolean'
      }
    },
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
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// 定义为全局组件
// Vue.component('CompOne', compoent)

new Vue({
  components: {
    CompOne: compoent // == Vue.component('CompOne', compoent)，但Vue.component为全局组件
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="true" propOne="text2"></comp-one>
    </div>
  `
})
