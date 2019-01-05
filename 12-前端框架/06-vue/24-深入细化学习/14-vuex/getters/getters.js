// getters 理解为 computed，用于组装数据，也在组件的computed引入
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
