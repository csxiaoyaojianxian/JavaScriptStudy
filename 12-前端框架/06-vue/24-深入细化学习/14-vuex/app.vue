<template>
  <div id="app"></div>
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
    ...mapMutations(['updateCount']),
    // mapActions
    ...mapActions(['updateCountAsync'])
  },
  computed: {
    /**
     * 获取state
     */
    // 不使用mapState，不推荐
    count () {
      return this.$store.state.count
    },
    // 使用mapState，推荐
    ...mapState(['count']), // 同名，不设置别名
    ...mapState({
      counter1: 'count', // 设置别名1
      counter2: (state) => state.count  // 设置别名2
    }),
    /**
     * 获取getter
     */
    // 不使用mapGetters，不推荐
    fullName () {
      return this.$store.getters.fullName
    },
    // 使用mapGetters，推荐
    ...mapGetters({
      'fullName': 'fullName'
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
  }
}
</script>
