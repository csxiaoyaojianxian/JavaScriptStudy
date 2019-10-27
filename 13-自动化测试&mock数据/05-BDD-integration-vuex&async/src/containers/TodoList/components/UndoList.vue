<template>
  <div class="undolist">
    <div class="title">
      正在进行
      <span data-test="count" class="count">{{list.length}}</span>
    </div>
    <ul class="list">
      <li v-for="(item, index) in list"
        :key="index"
        data-test="list-item"
        class="item"
        @click="changeStatus(index)"
      >
        <input
          class="input"
          v-if="item.status === 'input'"
          data-test="input"
          :value="item.value"
          @blur="handleInputBlur"
          @change="(e) => changeItemValue(e.target.value, index)"
        >
        <span v-else>{{item.value}}</span>
        <span data-test="delete-button" @click="() => { handleDelete(index) }" class="delete">-</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: [ 'list' ],
  data () {
    return {
      //
    }
  },
  methods: {
    handleDelete (index) {
      this.$emit('delete', index)
    },
    changeStatus (index) {
      this.$emit('status', index)
    },
    handleInputBlur () {
      this.$emit('reset')
    },
    // handleInputChange (value, index) {
    //   this.$emit('change', {
    //     value,
    //     index
    //   })
    // },
    changeItemValue (value, index) {
      this.$emit('change', {
        value,
        index
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.undolist {
  width: 600px;
  margin: 0 auto;
}
.title {
  margin: 10px 0;
  line-height: 30px;
  font-size: 24px;
  font-weight: bold;
}
.count {
  margin-top: 5px;
  float: right;
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  background: #e6e6e6;
  border-radius: 10px;
  color: #000;
}
.item {
  margin-bottom: 10px;
  line-height: 32px;
  font-size: 14px;
  background: #fff;
  border-left: 5px solid #629A9A;
  border-radius: 3px;
  text-indent: 10px;
}
.list {
  list-style-type: none;
}
.delete {
  margin-top: 5px;
  margin-right: 10px;
  float: right;
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  background: #e6e6e6;
  border-radius: 10px;
  color: #000;
  text-indent: 0;
  cursor: pointer;
}
.input {
  width: 460px;
  height: 22px;
  text-indent: 10px;
}
</style>
