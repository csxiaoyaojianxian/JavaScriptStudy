import Vue from 'vue'
import App from './app.vue'

import Vuex from 'vuex'
import createStore from './store/store'
Vue.use(Vuex)
// 创建store实例
const store = createStore()

// vuex 动态注册模块，注册模块c
store.registerModule('c', {
  state: {
    text: 3
  }
})
// 注销模块
store.unregisterModule('c')

// watch监听
store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched:', newCount)
})
// 监听mutations，mutations调用时回调，一般用于打log调试、制作插件等
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
// 监听actions，actions调用时回调，一般用于打log调试、制作插件等
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#root')
