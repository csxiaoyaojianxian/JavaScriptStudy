<template>
  <div>
    <div class="header">
      <h1 class="slogan">CF赛程管理后台</h1>
      <div class="header-tg">
        <span>{{serviceName}}</span>
        <a v-on:click="openServiceDialog">切换</a>
      </div>
      <div class="header-tg">
        <span class="nickname"></span>
        <a href="javascript:void(0);" id="dologout" v-on:click="logout">退出</a>
      </div>
    </div>
    <service-panel @onChangeSvr="onSvrChange"></service-panel>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      serviceName: 'CF端游'
    }
  },
  created: function () {
    this.$milo.checkLogin();
  },
  methods: {
    logout: function () {
      this.$milo.logout();
    },
    openServiceDialog: function () {
      this.$dialog.TGDialogS('dialogPickGame')
    },
    onSvrChange: function (svrName) {
      this.serviceName = svrName;
    },


  },
}
</script>

