import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    // 所有state的修改需要通过mutation（实际可以直接修改，但是不推荐）
    // strict:true 限制不能外部修改
    // 但是正式环境不建议添加此属性
    strict: isDev,
    // 四个属性
    state: defaultState, // state
    mutations, // mutations
    getters, // getters
    actions // actions
    
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         commit('updateCount', { num: 56789 }, { root: true })
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({ commit }) {
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  // if (module.hot) {
  //   module.hot.accept([
  //     './state/state',
  //     './mutations/mutations',
  //     './actions/actions',
  //     './getters/getters'
  //   ], () => {
  //     const newState = require('./state/state').default
  //     const newMutations = require('./mutations/mutations').default
  //     const newActions = require('./actions/actions').default
  //     const newGetters = require('./getters/getters').default

  //     store.hotUpdate({
  //       state: newState,
  //       mutations: newMutations,
  //       getters: newGetters,
  //       actions: newActions
  //     })
  //   })
  // }

  return store
}
