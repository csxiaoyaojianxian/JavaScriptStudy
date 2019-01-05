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
    actions, // actions

    /**
     * vuex 模块
     * 在项目非常大时使用
     * 模块可以嵌套，但逻辑会变复杂，不推荐
     */
    modules: {
      // 模块a
      a: {
        // 使用了命名空间，允许不同模块mutations和actions重复
        // 如果为false，则调用mutations和actions不需要指定模块
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          // 如果不设置namespace，此处的state指向模块中的state，不需要指定模块
          // 否则区分命名空间
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          // getters 全局getter
          // rootState 全局state
          textPlus (state, getters, rootState) {
            return state.text + rootState.b.text // 获取模块b数据
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            // root: true 才会搜索全局mutation
            commit('updateText', rootState.count, { root: true })
            // 调用全局 mutation
            commit('updateCount', { num1: 1, num: 2 }, { root: true })
          }
        }
      },
      // 模块b
      b: {
        namespaced: true,
        state: {
          text: 2
        },
        actions: {
          testAction ({ commit }) {
            // 模块间调用
            commit('a/updateText', 'test', { root: true })
          }
        }
      }
    },
    
    /**
     * vuex 插件
     * 数组形式，一个插件就是一个数组元素
     */
    plugins: [
      (store) => {
        // 可以调用 store.subscribe ... 自定义功能
        console.log('my plugin invoked')
      }
    ]
  })

  /**
   * 为vuex添加热更新功能
   * 否则每次更新代码会自动刷新一次页面
   */
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
