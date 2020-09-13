<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <component :is="app"></component>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      comps: ['comp1', 'comp2', 'comp3'],
      app: ''
    }
  },
  created () {
    setTimeout(() => {
      // npm install babel-plugin-syntax-dynamic-import --save-dev

      // this.comps.forEach(app => {
      //   Vue.components(app, () => import(`./comps/${app}.vue`))
      // })

      const requireComponent = require.context(
        // 其组件目录的相对路径
        './comps',
        // 是否查询其子目录
        false,
        // 匹配基础组件文件名的正则表达式
        /comp[0-9]+\.(vue|js)$/
      )
      requireComponent.keys().forEach(fileName => {
        // 获取组件配置
        const componentConfig = requireComponent(fileName)
        // 获取组件的 PascalCase 命名
        const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')
        // 全局注册组件
        Vue.component(
          componentName,
          // 如果这个组件选项是通过 `export default` 导出的，
          // 那么就会优先使用 `.default`，
          // 否则回退到使用模块的根。
          componentConfig.default || componentConfig
        )
      })
      setTimeout(() => {
        this.app = 'comp2'
      }, 2000)
    }, 1000)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
