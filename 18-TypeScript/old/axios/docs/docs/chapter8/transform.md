# 请求和响应配置化

## 需求分析

官方的 axios 库 给默认配置添加了 `transformRequest` 和 `transformResponse` 两个字段，它们的值是一个数组或者是一个函数。

其中 `transformRequest` 允许你在将请求数据发送到服务器之前对其进行修改，这只适用于请求方法 `put`、`post` 和 `patch`，如果值是数组，则数组中的最后一个函数必须返回一个字符串或 `FormData`、`URLSearchParams`、`Blob` 等类型作为 `xhr.send` 方法的参数，而且在 `transform` 过程中可以修改  `headers` 对象。

而 `transformResponse` 允许你在把响应数据传递给 `then` 或者 `catch` 之前对它们进行修改。

当值为数组的时候，数组的每一个函数都是一个转换函数，数组中的函数就像管道一样依次执行，前者的输出作为后者的输入。

举个例子：

```typescript
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...axios.defaults.transformRequest],
  transformResponse: [axios.defaults.transformResponse, function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
```

## 修改默认配置

先修改 `AxiosRequestConfig` 的类型定义，添加 `transformRequest` 和 `transformResponse` 俩个可选属性。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
```

接着修改默认配置，如下：

`defaults.ts`：

```typescript
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  // ...
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}
```

我们把之前对请求数据和响应数据的处理逻辑，放到了默认配置中，也就是默认处理逻辑。

## transform 逻辑重构

接下来，我们就要重构之前写的对请求数据和响应数据的处理逻辑了。由于我们可能会编写多个转换函数，我们先定义一个 `transform` 函数来处理这些转换函数的调用逻辑。

`core/transform.ts`

```typescript
import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
```

`transform` 函数中接收 `data`、`headers`、`fns` 3 个参数，其中 `fns` 代表一个或者多个转换函数，内部逻辑很简单，遍历 `fns`，执行这些转换函数，并且把 `data` 和 `headers` 作为参数传入，每个转换函数返回的 `data` 会作为下一个转换函数的参数 `data` 传入。

接下来修改对请求数据和响应数据的处理逻辑。

`dispatchRequest.ts`：

```typescript

import transform from './transform'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
```

我们把对请求数据的处理和对响应数据的处理改成使用 `transform` 函数实现，并把配置中的 `transformRequest` 及 `transformResponse` 分别传入。

## demo 编写

```typescript
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
```

我们对 `transformRequest` 做了修改，在执行它默认的 `transformRequest` 之前，我们先用 `qs.stringify` 库对传入的数据 `data` 做了一层转换。同时也对 `transformResponse` 做了修改，在执行完默认的 `transformResponse` 后，会给响应的 `data` 对象添加一个 `data.b = 2`。

因为之前我们实现了配置的合并，而且我们传入的 `transformRequest` 和 `transformResponse` 遵循默认合并策略，它们会覆盖默认的值。

至此，我们就实现了请求和响应的配置化。到目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。官网提供了一个 `axios.create` 的工厂方法允许我们创建一个新的 `axios` 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。下面一节课我们就来实现这个 feature。

