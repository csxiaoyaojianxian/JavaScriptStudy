import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root') // 效果和 el:'#root' 相同
console.log(app.$el)

console.log(app.$data)
console.log(app.$props)
console.log(app.$options)
setInterval(() => {
    app.$options.data.text += 1 // 不变化
    app.$data.text += 1 // 变化，app.text代理到app.$data.text
}, 1000)

app.$options.render = (h) => {
  return h('div', {}, 'new render function')
}

console.log(app.$root === app) // true
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
console.log(app.$refs)
console.log(app.$isServer)

// watch及解除
const unWatch = app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
})
setTimeout(() => {
  unWatch()
}, 2000)

// 事件触发
app.$on('test1', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
app.$once('test2', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
setInterval(() => {
  app.$emit('test1', 1, 2)
  app.$emit('test2', 1, 2)
}, 1000)

// forceUpdate & set
let i = 0
setInterval(() => {
  app.obj.a = i++
  app.$forceUpdate() // 对没有没有初始声明的值强制渲染
  // app.$set(app.obj, 'a', i) // 补上声明，效果与$forceUpdate()相同
  // app.$delete ...
}, 1000)

// nextTick
// app.$nextTick([callback])
