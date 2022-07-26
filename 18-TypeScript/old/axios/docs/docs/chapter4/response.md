# 获取响应数据

## 需求分析

在前面的章节中，我们发送的请求都可以从网络层面接收到服务端返回的数据，但是代码层面并没有做任何关于返回数据的处理。我们希望能处理服务端响应的数据，并支持 Promise 链式调用的方式，如下：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})
```

我们可以拿到 `res` 对象，并且我们希望该对象包括：服务端返回的数据 `data`，HTTP 状态码`status`，状态消息 `statusText`，响应头 `headers`、请求配置对象 `config` 以及请求的 `XMLHttpRequest` 对象实例 `request`。

## 定义接口类型

根据需求，我们可以定义一个 `AxiosResponse` 接口类型，如下：

```typescript
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
```

另外，`axios` 函数返回的是一个 `Promise` 对象，我们可以定义一个 `AxiosPromise` 接口，它继承于 `Promise<AxiosResponse>` 这个泛型接口：

```typescript
export interface AxiosPromise extends Promise<AxiosResponse> {
}
```

这样的话，当 `axios` 返回的是 `AxiosPromise` 类型，那么 `resolve` 函数中的参数就是一个 `AxiosResponse` 类型。

对于一个 AJAX 请求的 `response`，我们是可以指定它的响应的数据类型的，通过设置 `XMLHttpRequest` 对象的 [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) 属性，于是我们可以给 `AxiosRequestConfig` 类型添加一个可选属性：

```typescript
export interface AxiosRequestConfig {
  // ...
  responseType?: XMLHttpRequestResponseType
}
```

`responseType` 的类型是一个 `XMLHttpRequestResponseType` 类型，它的定义是 `"" | "arraybuffer" | "blob" | "document" | "json" | "text"` 字符串字面量类型。

## 实现获取响应数据逻辑

首先我们要在 `xhr` 函数添加 [`onreadystatechange`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange) 事件处理函数，并且让 `xhr` 函数返回的是 `AxiosPromise` 类型。

`xhr.ts`：

```typescript
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
```

注意，我们这里还判断了如果 `config` 中配置了 `responseType`，我们把它设置到 `request.responseType` 中。在 `onreadystatechange` 事件函数中，我们构造了 `AxiosResponse` 类型的 `reponse` 对象，并把它 `resolve` 出去。

修改了 `xhr` 函数，我们同样也要对应修改 `axios` 函数：

`index.ts`：

```typescript
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
```

这样我们就实现了 `axios` 函数的 Promise 化。

## demo 编写

我们在 `examples/base/app.ts` 文件中添加 2 段代码：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})
```

我们打开浏览器运行 demo，看一下结果，发现我们可以正常 log 出这个 `res` 变量，它包含 `AxiosResponse` 类型中定义的那些属性，不过我们发现 2 个小问题：第一个是 `headers` 属性是一个字符串，我们需要把它解析成对象类型；第二个是在第一个请求中，得到的数据是一个 JSON 字符串，我们也需要把它转换成对象类型。

那么下一小节，我们将来解决第一个问题，对于响应的 `header` 做处理。


