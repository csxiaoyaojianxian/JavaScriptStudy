import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './registerServiceWorker'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
/**
 * mockjs
 */
if (process.env.NODE_ENV === 'development') {
  require('@/data/apiMock')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
