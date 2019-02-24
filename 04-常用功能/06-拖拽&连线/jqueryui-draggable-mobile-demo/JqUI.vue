<template>
  <div>
    <div id="draggable" class="ui-widget-content">
      <p>请拖动我！</p>
    </div>
  </div>
</template>
<script>
import jsplumb from 'jsplumb'
export default {
  mounted(){
    $(function() {
      $( "#draggable" ).draggable()
    })
  }
}
</script>

<style scoped lang="scss">
#draggable { width: 150px; height: 150px; padding: 0.5em; }
</style>
