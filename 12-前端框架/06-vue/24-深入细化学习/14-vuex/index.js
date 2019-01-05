import Vue from 'vue'
import App from './app.vue'

import Vuex from 'vuex'
import createStore from './store/store'
Vue.use(Vuex)
// 创建store实例
const store = createStore()

store.registerModule('c', {
  state: {
    text: 3
  }
})

store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched:', newCount)
})

store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})

store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#root')
