import Vue from 'vue'

const component = {
  model: {
    prop: 'value1', // 如果不设置，直接用 props: ['value']，value名容易冲突
    event: 'change' // 如果不设置，则直接用 $emit('input', e.target.value)，input名容易冲突
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

// v-model
new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
    </div>
  `
})
