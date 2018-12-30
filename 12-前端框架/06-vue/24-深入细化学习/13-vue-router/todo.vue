<template>
  <section>
    <router-view />
  </section>
</template>

<script>
export default {
  // 导航守卫
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter', this)
    next(vm => {
      console.log('after enter vm.id is ', vm.id)
    })
  },
  // 导航守卫
  beforeRouteUpdate (to, from, next) {
    console.log('todo update')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  // 导航守卫
  beforeRouteLeave (to, from, next) {
    console.log('todo leave')
    next()
  }
}
</script>
