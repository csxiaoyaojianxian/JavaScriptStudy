# 错误处理

## 需求分析

在上一章节，我们实现了 `ts-axios` 的基础功能，但目前为止我们都是处理了正常接收请求的逻辑，并没有考虑到任何错误情况的处理，这对于一个程序的健壮性而言是远不够的，因此我们这一章需要对 AJAX 各种错误情况做处理。

并且我们希望程序也能捕获到这些错误，做进一步的处理。

```typescript
axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})
```

如果在请求的过程中发生任何错误，我们都可以在 `reject` 回调函数中捕获到。

我们把错误分成了几类，接下来我们就来分别处理这些错误情况。

## 处理网络异常错误

当网络出现异常（比如不通）的时候发送请求会触发 `XMLHttpRequest` 对象实例的 `error` 事件，于是我们可以在 [`onerror`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onerror) 的事件回调函数中捕获此类错误。

我们在 `xhr` 函数中添加如下代码：

```typescript
request.onerror = function handleError() {
  reject(new Error('Network Error'))
}
```

## 处理超时错误

我们可以设置某个请求的超时时间 [`timeout`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)，也就是当请求发送后超过某个时间后仍然没收到响应，则请求自动终止，并触发 `timeout` 事件。

请求默认的超时时间是 0，即永不超时。所以我们首先需要允许程序可以配置超时时间：

```typescript
export interface AxiosRequestConfig {
  // ...
  timeout?: number
}
```

接着在 `xhr` 函数中添加如下代码：

```typescript
const { /*...*/ timeout } = config

if (timeout) {
  request.timeout = timeout
}

request.ontimeout = function handleTimeout() {
  reject(new Error(`Timeout of ${timeout} ms exceeded`))
}
```

## 处理非 200 状态码

对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，对于不在这个区间的状态码，我们也把它们认为是一种错误的情况做处理。

```typescript
request.onreadystatechange = function handleLoad() {
  if (request.readyState !== 4) {
    return
  }

  if (request.status === 0) {
    return
  }

  const responseHeaders = parseHeaders(request.getAllResponseHeaders())
  const responseData =
    responseType && responseType !== 'text' ? request.response : request.responseText
  const response: AxiosResponse = {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config,
    request
  }
  handleResponse(response)
}

function handleResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(new Error(`Request failed with status code ${response.status}`))
  }
}
```

我们在 `onreadystatechange` 的回调函数中，添加了对 [`request.status`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) 的判断，因为当出现网络错误或者超时错误的时候，该值都为 0。

接着我们在 `handleResponse` 函数中对 `request.status` 的值再次判断，如果是 `2xx` 的状态码，则认为是一个正常的请求，否则抛错。

## demo 编写

在 `examples` 目录下创建 `error` 目录，在 `error` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Error example</title>
  </head>
  <body>
    <script src="/__build__/error.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})
```

接着在 `server.js` 添加新的接口路由：

```typescript
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
```

然后在命令行运行 `npm run dev`，接着打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Error` 目录下，通过开发者工具的 network 部分我们可以看到不同的错误情况。

至此我们对各种错误都做了处理，并把它们抛给了程序应用方，让他们对错误可以做进一步的处理。但是这里我们的错误都仅仅是简单的 Error 实例，只有错误文本信息，并不包含是哪个请求、请求的配置、响应对象等其它信息。那么下一节课，我们会对错误信息做增强。