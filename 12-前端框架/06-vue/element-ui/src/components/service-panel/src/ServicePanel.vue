<template>
  <div class="pop pop-s" id="dialogPickGame">
    <h2 class="pop-tit">选择游戏</h2>
    <div class="pickgame">
        <a v-on:click="chooseService('cf')">CF端游</a>
        <a v-on:click="chooseService('cfm')">CF手游</a>
        <a v-on:click="chooseService('cfw')">CF页游</a>
    </div>
    <a class="pop-close" href="javascript:closeDialog();">&times;</a>
</div>
</template>
<script>

const SVR_MAP = {
  "cf":"CF端游",
  "cfm":"CF手游",
  "cfw":"CF页游"
}

export default {
  name:'ServicePanel',
  created:function(){
    var svrname = this.$cookie.get('cfpl-svr-type') || 'cf';
    this.$emit('onChangeSvr',SVR_MAP[svrname]);
  },
  methods:{
    /**
     * 选择业务
     */
    chooseService:function(svrCode){
      this.$cookie.set('cfpl-svr-type',svrCode,{domain:'qq.com'});
      location.reload()
    }
  }
}
</script>
