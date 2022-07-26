# withCredentials

## 需求分析

有些时候我们会发一些跨域请求，比如 `http://domain-a.com` 站点发送一个 `http://api.domain-b.com/get` 的请求，默认情况下，浏览器会根据同源策略限制这种跨域请求，但是可以通过 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 技术解决跨域问题。

在同域的情况下，我们发送请求会默认携带当前域下的 cookie，但是在跨域的情况下，默认是不会携带请求域下的 cookie 的，比如 `http://domain-a.com` 站点发送一个 `http://api.domain-b.com/get` 的请求，默认是不会携带 `api.domain-b.com` 域下的 cookie，如果我们想携带（很多情况下是需要的），只需要设置请求的 `xhr` 对象的 `withCredentials` 为 true 即可。

## 代码实现

先修改 `AxiosRequestConfig` 的类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  withCredentials?: boolean
}
```

然后修改请求发送前的逻辑。

`core/xhr.ts`：

```typescript
const { /*...*/ withCredentials } = config

if (withCredentials) {
  request.withCredentials = true
}
```

## demo 编写

在 `examples` 目录下创建 `more` 目录，在 `cancel` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>More example</title>
  </head>
  <body>
    <script src="/__build__/more.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', { }, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
```

这次我们除了给 `server.js` 去配置了接口路由，还创建了 `server2.js`，起了一个跨域的服务。

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/more/server2', function(req, res) {
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/server2', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)

const port = 8088
module.exports = app.listen(port)
```

这里需要安装一下 `cookie-parser` 插件，用于请求发送的 cookie。

通过 demo 演示我们可以发现，对于同域请求，会携带 cookie，而对于跨域请求，只有我们配置了 `withCredentials` 为 true，才会携带 cookie。

至此我们的 `withCredentials` feature 开发完毕，下一节课我们来实现 axios 对 XSRF
 的防御功能。
