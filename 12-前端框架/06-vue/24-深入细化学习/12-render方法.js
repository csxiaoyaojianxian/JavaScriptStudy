import Vue from 'vue'

// 利用render创建VNode，可以不使用template来实现模板

const component = {
  props: ['props1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  // 渲染上面的template
  render (createElement) {
    return createElement('div', {
      style: this.style,
      // on: {
      //   click: () => { this.$emit('click') }
      // }
    }, [
      // this.$slots.default,
      this.$slots.header,
      this.props1
    ])
  },
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
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // `,
  // 渲染上面的template
  render (createElement) {
    // == return this.$createElement()
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        // on: {
        //   click: this.handleClick
        // },
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          // domProps: {
          //   innerHTML: '<span>345</span>'
          // },
          // attrs: {
          //   id: 'test-id'
          // }
        }, this.value)
      ]
    )
  }
})
