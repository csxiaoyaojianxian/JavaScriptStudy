<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div :is="compName"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { loadScript, loadCss } from '@/assets/utils'

export default {
  name: 'App',
  data() {
    return {
      compName: ''
    }
  },
  mounted() {
    // 模拟ajax异步请求
    setTimeout(() => {
      const compName = 'testComp'
      const jsLink = './comp/testComp.umd.js'
      const cssLink = './comp/testComp.css'
      loadScript(jsLink, compName).then(() => {
        loadCss(cssLink, compName)
        // Vue.component(compName, window[compName].default);
        Vue.component(compName, window[compName]);
        this.compName = compName;
      })
    }, 1000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
