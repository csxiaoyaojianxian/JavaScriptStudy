import Vue from 'vue'

// 子组件
const component = {
  name: 'comp',
  template: `
    <div :style="style">
      <slot></slot>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

// 父组件
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
  mounted () {
    // ref 作用于组件和dom节点，推荐用于组件而非dom节点
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  template: `
    <div>
      <comp-one ref="comp">
        <span ref="span">{{value}}</span>
      </comp-one>
    </div>
  `
})
