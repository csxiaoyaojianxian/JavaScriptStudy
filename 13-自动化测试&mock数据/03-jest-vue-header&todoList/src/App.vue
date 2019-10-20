<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from '@/containers/TodoList/TodoList.vue'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>
<style lang="stylus">
* {
  margin: 0;
  padding: 0
}
</style>
