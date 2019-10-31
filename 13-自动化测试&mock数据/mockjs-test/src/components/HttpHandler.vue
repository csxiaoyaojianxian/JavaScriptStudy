<template>
  <div />
</template>

<script>

export default {
  name: 'httpHandler',
  created () {
    this.$axios.interceptors.request.use(config => {
      // 获取传参
      // let data = null
      // if (config.method === 'get') {
      //   data = config.params
      // } else if (config.method === 'post') {
      //   data = config.data
      // }
      return config
    })
    // 响应拦截器
    this.$axios.interceptors.response.use(
      config => {
        if (config && config.data && config.data.hasOwnProperty('code') && parseInt(config.data.code) === 0) {
          return Promise.resolve(config.data.data, config.data.msg, config.data.code)
        } else if (config && config.data && config.data.code && config.data.msg && config.data.data) {
          console.log(JSON.stringify(config.data))
          let err = new Error(config.data.msg)
          err.code = config.data.code
          err.data = config.data.data
          return Promise.reject(err)
        } else {
          this.$sentry.log('网络繁忙，请稍后再试！')
          return Promise.reject(new Error('网络繁忙，请稍后再试！'))
        }
      },
      error => {
        console.log(error)
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
            case 404:
            case 502:
              console.log('network error')
              break
          }
        }
        return Promise.reject(new Error('网络异常'))
      }
    )
  }
}
</script>
