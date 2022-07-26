# 处理请求 header

## 需求分析

我们上节课遗留了一个问题：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
```

我们做了请求数据的处理，把 `data` 转换成了 JSON 字符串，但是数据发送到服务端的时候，服务端并不能正常解析我们发送的数据，因为我们并没有给请求 `header` 设置正确的 `Content-Type `。

所以首先我们要支持发送请求的时候，可以支持配置 `headers` 属性，如下：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
})
```

并且在当我们传入的 `data` 为普通对象的时候，`headers` 如果没有配置 `Content-Type` 属性，需要自动设置请求 `header` 的 `Content-Type` 字段为：`application/json;charset=utf-8`。


## processHeaders 函数实现

根据需求分析，我们要实现一个工具函数，对 request 中的 `headers` 做一层加工。我们在 `helpers` 目录新建 `headers.ts` 文件。

`helpers/headers.ts`：

```typescript
import { isPlainObject } from './util'

function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
```

这里有个需要注意的点，因为请求 `header` 属性是大小写不敏感的，比如我们之前的例子传入 `header` 的属性名 `content-type` 就是全小写的，所以我们先要把一些 `header` 属性名规范化。

## 实现请求 header 处理逻辑

在这之前，我们先修改一下 `AxiosRequestConfig` 接口类型的定义，添加 `headers` 这个可选属性：

`types/index.ts`

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}
```

`index.ts`：

```typescript
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformHeaders (config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
```

因为我们处理 `header` 的时候依赖了 `data`，所以要在处理请求 `body` 数据之前处理请求 `header`。

`xhr.ts`：

```typescript
export default function xhr (config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach((name) => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
```

这里要额外判断一个逻辑，当我们传入的 `data` 为空的时候，请求 `header` 配置 `Content-Type` 是没有意义的，于是我们把它删除。

## demo 编写

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})
```

通过 demo 我们可以看到，当我们请求的数据是普通对象并且没有配置 `headers` 的时候，会自动为其添加 `Content-Type:application/json;charset=utf-8`；同时我们发现当 data 是某些类型如 `URLSearchParams` 的时候，浏览器会自动为请求 `header`加上合适的 `Content-Type`。

至此我们对于请求的处理逻辑暂时告一段落。目前我们的请求从网络层面是可以收到服务端的响应的，下一节课我们就从代码层面来处理服务端响应，并且让调用方可以拿到从服务端返回的数据。
