<template>
  <div class="header">
    <div class="header-content">
      TodoList
      <!-- 不能用 v-model -->
      <input
        class="header-input"
        data-test="header-input"
        :value="inputValue"
        @input="e => changeInputValue(e.target.value)"
        @keyup.enter="addTodoItem"
        placeholder="TodoItem"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState({
      inputValue: state => state.inputValue
    })
  },
  methods: {
    ...mapMutations({
      changeInputValue: 'changeInputValue'
    }),
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.header {
  line-height: 60px;
  background: #333;
}
.header-content {
  width: 600px;
  margin: 0 auto;
  color: #fff;
  font-size: 24px;
}
.header-input {
  float: right;
  width: 360px;
  margin-top: 16px;
  line-height: 24px;
  outline: none;
  color: #333;
}
</style>
