// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false
Vue.use(VueMeta, {
  keyName: 'head', // vuemeta的参数名称
  attribute: 'data-vue-meta', // 由vue-meta渲染的元素会添加一个属性 <title data-vue-meta=""></title>
  ssrAttribute: 'data-vue-meta-server-rendered', // 由服务器端渲染的vue-meta元素的自定义属性名称
  tagIDKeyName: 'vmid' // vue-meta用于确定是否覆盖或附加标签的属性名称
})

/* eslint-disable no-new */
export function createApp () {
  let router = createRouter()
  let store = createStore()
  let app = new Vue({
    router,
    store,
    ...App
  })
  return { app, router, store }
}
