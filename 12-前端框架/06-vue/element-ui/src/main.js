import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

import CFUtil from './util/index.js'
import CFComponents from './components/index.js'

import Resource from 'vue-resource'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import store from './store'

Vue.use(Resource)
Vue.use(VueCookie)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(CFComponents)
Vue.use(CFUtil)

Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;

Vue.http.options.xhr = { withCredentials: true }

Vue.http.interceptors.push((request, next) => {
  next(response => {
    let ret = response.data;
    if (ret.status == -300 || ret.status == -100) { //没有权限
      location.href = 'https://cf.qq.com/cp/a20170728ms/Login_Sr98shV.html';
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})