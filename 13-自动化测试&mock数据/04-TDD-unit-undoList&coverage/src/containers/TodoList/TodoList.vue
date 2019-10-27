<template>
  <div>
    <Header @add="addUndoItem" />
    <UndoList
      :list="undoList"
      @delete="handleItemDelete"
      @status="changeStatus"
      @reset="resetStatus"
      @change="changeItemValue"
    />
  </div>
</template>

<script>
import Header from './components/Header'
import UndoList from './components/UndoList'
export default {
  name: 'TodoList',
  components: {
    Header,
    UndoList
  },
  data () {
    return {
      undoList: [
        // {
        //   status: 'input',
        //   value: 1
        // }, {
        //   status: 'input',
        //   value: 1
        // }
      ]
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({
        status: 'div',
        value: inputValue
      })
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          newList.push({
            status: 'input',
            value: item.value
          })
        } else {
          newList.push({
            status: 'div',
            value: item.value
          })
        }
      })
      this.undoList = newList
    },
    resetStatus () {
      console.log(111)
      let newList = []
      this.undoList.forEach((item, itemIndex) => {
        newList.push({
          status: 'div',
          value: item.value
        })
      })
      this.undoList = newList
    },
    changeItemValue (obj) {
      this.undoList[obj.index].value = obj.value
      // const newList = []
      // this.undoList.forEach((item, itemIndex) => {
      //   if (itemIndex === index) {
      //     newList.push({
      //       status: 'input',
      //       value: item.value
      //     })
      //   } else {
      //     newList.push({
      //       status: 'div',
      //       value: item.value
      //     })
      //   }
      // })
      // this.undoList = newList
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
