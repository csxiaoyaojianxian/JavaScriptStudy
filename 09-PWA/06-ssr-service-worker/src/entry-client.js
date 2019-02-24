import 'babel-polyfill'
import { createApp } from './app'

let { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => app.$mount('#app'))
