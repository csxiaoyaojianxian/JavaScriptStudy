import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import createRouter from './config/router'

Vue.use(VueRouter)

const router = createRouter()

// 全局导航守卫
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  if (to.fullPath === '/app') {
    next({ path: '/login', replace: true })
  } else {
    next()
  }
})

// 全局导航守卫
router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

// 全局导航守卫，不需要传入next，此时已经完成跳转
router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
