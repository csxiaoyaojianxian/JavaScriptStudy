<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="sider" v-bind:style="leftMenu">
      <left-menu></left-menu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      leftMenu: {
        height: window.document.body.offsetHeight + "px"
      }
    }
  }
}
</script>