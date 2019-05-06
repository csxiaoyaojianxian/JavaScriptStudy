import Vue from 'vue'
import Router from 'vue-router'

// 定义切割点，异步加载路由组件
let Home = () => import('@/pages/Home.vue')
let List = () => import('@/pages/List.vue')
let NotFound = () => import('@/pages/NotFound.vue')
let Appshell = () => import('@/pages/Appshell.vue')

Vue.use(Router)

export function createRouter () {
  return new Router({

    // history 模式，需要服务器后端配合做路由代理，将所有的前端路由同步代理到 /
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
          notKeepAlive: true
        }
      },
      {
        path: '/404',
        name: 'notFound',
        component: NotFound
      },
      {
        path: '/appshell',
        name: 'appshell',
        component: Appshell
      }
    ]
  })
}
