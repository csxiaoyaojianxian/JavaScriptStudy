import Router from 'vue-router' // npm i vue-router -S

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 默认为hash
    // base: '/base/',
    linkActiveClass: 'active-link', // 给router-link统一添加样式 部分匹配
    linkExactActiveClass: 'exact-active-link', // 给router-link统一添加样式 完全匹配
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition // 保留之前的滚动位置
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: true // 浏览器不支持history方式，自动使用hash方式
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
