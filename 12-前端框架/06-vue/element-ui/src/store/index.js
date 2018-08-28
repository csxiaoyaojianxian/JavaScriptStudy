import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'

Vue.use(Vuex)
Vue.use(Resource)

export default new Vuex.Store({
  state: {
    pageTitle: '',
    menuClass: '',
  },
  mutations: {
    setPageTitle: function (state, title) {
      state.pageTitle = title || '';
    },
    setMenuClass: function (state, menuClass) {
      state.menuClass = menuClass;
    },
  },
  actions: {
    
  }
})
