# 引用 ts-axios 库

## 在 TS 项目中引用

我们借助于 [vue-cli](https://cli.vuejs.org/) 脚手架创建一个 TypeScript 的 Vue 项目，然后我们把 Vue 官网上一段使用 axios 发请求的 [demo](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8) 代码抄过来。

我们需要先执行 `npm install ts-axios-new` 安装 `ts-axios` 库。

`HelloWorld.vue`

```vue
<template>
  <div class="hello">
    <p>
      Ask a yes/no question:
      <input v-model="question">
    </p>
    <p>{{ answer }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import _ from 'lodash'
  import axios from 'ts-axios-new'

  export default Vue.extend({
    name: 'HelloWorld',
    data () {
      return {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
      }
    },
    created () {
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
      debouncedGetAnswer () {
        // do nothing
      },
      getAnswer () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. -)'
          return
        }
        this.answer = 'Thinking...'
        const instance = axios.create()
        instance.interceptors.request.use((config) => {
          config.params = {
            _t: +new Date()
          }
          return config
        })

        instance.get('https://yesno.wtf/api')
          .then((response) => {
            this.answer = _.capitalize(response.data.answer)
          })
          .catch((error) => {
            this.answer = 'Error! Could not reach the API. ' + error
          })
      }
    },
    watch: {
      question: function (newQuestion: string, oldQuestion: string) {
        this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetAnswer()
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
```
这段代码主要是提供了一个 `input` 输入框，绑定了 `question` 变量，当我们输入的时候，会触发 `question` 的变化，执行 `watch question` 中的逻辑，执行 `this.debouncedGetAnswer` 方法，实际上就是 `debounce` 执行了 `getAnswer` 方法，发送请求。

我们通过 `import axios from 'ts-axios-new'
` 去加载 `ts-axios` 库，实际上就是引入了 `node_modules/ts-axios-new/dist/axios.es5.js`，因为 `ts-axios-new` 的 `package.json` 文件中配置的 `module` 字段是 `dist/axios.es5.js`，在 `webpack` 中优先 `import` 优先会找 `module` 字段，其次是 `main` 字段。

> 小技巧：当我们引入某个库运行时出现问题时候，我们就可以调试 node_modules 中对应引入的代码。

注意我们这里先使用了 `axios.create()` 方法创建了一个 `instance`，然后添加了一个请求拦截器，会在每次发送请求前，添加了一个 `_t` 参数，值为时间戳。然后执行 `instance.get` 发送一个请求。

我们可以看到整个 demo 是可以正常运行的，并且没有任何类型相关的问题，说明我们的库打包后的代码和类型声明文件都是没有问题的。

## 在 JS 项目中引用

我们编写的 TS 库仍然可以被纯 JS 的项目引用，这次我们来修改[《Vue.js2.5+cube-ui重构饿了么App》](https://coding.imooc.com/class/74.html)课程的代码，把之前对 `axios` 的引用改成对 `ts-axios-new` 的引用。课程源码是开源的，所以没购买课程的小伙伴也可以去 [GitHub](https://github.com/ustbhuangyi/vue-sell) 下载。

我们需要先执行 `npm install ts-axios-new` 安装 `ts-axios` 库，然后修改代码。

`api/helpers.js`：

```javascript
import axios from 'ts-axios-new'

const urlMap = {
  development: '/',
  production: 'http://ustbhuangyi.com/sell/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0

export function get(url) {
  return function(params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {
    })
  }
}

```

只需要把 `import axios from 'axios'` 修改为 `import axios from 'ts-axios-new'` 即可。

接着运行项目，我们发现项目可以成功运行，因为我们实现了`axios` 在浏览器端的所有功能，所以可以放心的做替换。

至此，我们就完成了 `ts-axios` 库的开发、测试、编译、发布和引用。课程到这里也就告一段落了，下一章我们会对整个课程做总结与展望。
