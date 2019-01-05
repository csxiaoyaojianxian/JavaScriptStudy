<template>
  <div id="app">
    {{count}}
    {{textPlus}}
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  methods: {
    // mapMutations
    ...mapMutations(['updateCount', 'updateText', 'a/updateText']),
    // mapActions
    ...mapActions(['updateCountAsync', 'a/add'])
  },
  computed: {
    /**
     * 获取state
     */
    // 不使用mapState，不推荐
    count1 () {
      return this.$store.state.count
    },
    // 使用mapState，推荐
    ...mapState(['count']), // 同名，不设置别名
    ...mapState({
      counter1: 'count', // 设置别名1
      counter2: (state) => state.count // 设置别名2
    }),
    /**
     * 获取getter
     */
    // 不使用mapGetters，不推荐
    fullName1 () {
      return this.$store.getters.fullName
    },
    // 使用mapGetters，推荐
    ...mapGetters({
      'fullName': 'fullName'
    }),

    /**
     * 使用模块
     */
    // 获取 a 模块中state的 text
    testA1 () {
      return this.$store.state.a.text
    },
    ...mapState({
      testA2: (state) => state.a.text
    }),
    ...mapGetters({
      'textPlus': 'a/textPlus'
    })
  },
  mounted () {
    /**
     * 设置state数据
     */
    // 不使用mapState，直接设置，否则调用mutation或action
    this.$store.state.count = 3

    /**
     * 使用commit调用mutations（必须同步）
     */
    // 不使用mapMutations，不推荐
    this.$store.commit('updateCount', {
      num1: 1,
      num2: 2
    })
    // 使用mapMutations，推荐
    this.updateCount({
      num1: 1,
      num2: 2
    })

    /**
     * 使用dispatch调用actions（可以异步）
     */
    // 不使用mapActions，不推荐
    this.$store.dispatch('updateCountAsync', {
      num: 3,
      time: 1000
    })
    // 使用mapActions，推荐
    this.updateCountAsync({
      num: 3,
      time: 1000
    })

    /**
     * 使用模块
     */
    this.updateText('test') // 不设置namespace
    this['a/updateText']('test') // 设置namespace
    this['a/add']() // 设置namespace
  }
}
</script>
