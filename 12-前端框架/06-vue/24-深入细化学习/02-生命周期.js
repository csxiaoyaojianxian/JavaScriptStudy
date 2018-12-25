import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate') // undefined
  },
  created () {
    console.log(this.$el, 'created') // undefined
  },
  // SSR不存在 ------------------------
  beforeMount () {
    console.log(this.$el, 'beforeMount') // 未填充数据的节点
  },
  mounted () {
    console.log(this.$el, 'mounted') // 完成渲染的节点
  },
  //----------------------------------
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // 与keep-alive相关 -----------------
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  //----------------------------------
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  //////////////////////////////////////////////////
  // 与使用template相同 在beforeMount和mounted之间执行
  render (h) {
    // throw new TypeError('render error') // 主动触发renderError
    console.log('render function invoked')
    return h('div', {}, this.text)
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡，并且正式环境可以使用
  }
})

app.$mount('#root')
// 触发update系列
setInterval(() => {
  app.text = app.text += 1
}, 1000)
// 主动销毁，解除事件监听和watch
setTimeout(() => {
  app.$destroy()
}, 1000)
