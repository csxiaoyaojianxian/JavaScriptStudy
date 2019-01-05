// action 也是用于修改数据，但是与mutations不同，可以为异步
// 只能传递一个参数，多参数需要包装为一个对象
// action 的触发使用 dispatch，mutation 的触发使用 commit
// 同步的可以直接用mutations，异步的必须用actions
// commit=>mutations,触发同步操作
// dispatch=>actions,触发异步操作

// import model from '../../model/client-model'
import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  // handle error
  if (err.code === 401) {
    notify({
      content: '你得先登录啊！'
    })
    bus.$emit('auth')
  }
}

export default {
  // 异步action，调用同步mutation，data为包装了多个参数的参数对象
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  },
  fetchTodos ({ commit }) {
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        commit('endLoading')
        notify({
          content: '你又多了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
        commit('endLoading')
      }).catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
        commit('endLoading')
      }).catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteAllCompleted ({ commit, state }) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        commit('endLoading')
        notify({
          content: '清理一下~~~'
        })
      }).catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  login ({ commit }, { username, password }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
          commit('endLoading')
        }).catch(err => {
          handleError(err)
          reject(err)
          commit('endLoading')
        })
    })
  }
}
