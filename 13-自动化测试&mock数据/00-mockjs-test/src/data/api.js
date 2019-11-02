import axios from 'axios'
const apiTable = {
  /**
   * common
   */
  log: '/test/log' // get
}

/**
 * log
 */
const log = (data = '') => {
  return new Promise((resolve, reject) => {
    axios.get(apiTable.log, {
      params: {
        data: data
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

export {
  log
}
