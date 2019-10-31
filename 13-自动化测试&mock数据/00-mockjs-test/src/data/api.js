import axios from 'axios'
const apiTable = {
  /**
   * common
   */
  log: '/test/log' // get
}

/**
 * 查询需求基本信息
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
