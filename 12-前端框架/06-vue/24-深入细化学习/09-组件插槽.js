import Vue from 'vue'

// 子组件
const component = {
  // 具名插槽
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  // 设置props用于作用域插槽
  template: `
    <div :style="style">
      <slot :value="value" aaa="111"></slot>
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
  // 作用域插槽，允许使用组件内的值，props.value 和 props.aaa
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props">{{props.value}} {{props.aaa}} {{value}}</span>
      </comp-one>
    </div>
  `
})
