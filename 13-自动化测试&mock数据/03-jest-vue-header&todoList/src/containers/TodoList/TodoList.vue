<template>
  <div>
    <Header @add="addUndoItem" />
    <ul>
      <li v-for="item in undoList" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'TodoList',
  components: {
    Header
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push(inputValue)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
