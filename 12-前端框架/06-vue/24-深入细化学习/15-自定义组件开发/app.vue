<template>
  <div id="app"></div>
</template>

<script>
export default {
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  }
}
</script>
