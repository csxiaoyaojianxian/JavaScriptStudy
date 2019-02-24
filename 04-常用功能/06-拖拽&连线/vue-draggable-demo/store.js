import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: ['ele1', 'ele2', 'ele3']
  },
  mutations: {
    updateList (state, value) {
      state.list = value
    }
  },
  actions: {

  }
})
