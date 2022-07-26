# 错误信息增强

## 需求分析

上一节课我们已经捕获了几类 AJAX 的错误，但是对于错误信息提供的非常有限，我们希望对外提供的信息不仅仅包含错误文本信息，还包括了请求对象配置 `config`，错误代码 `code`，`XMLHttpRequest` 对象实例 `request`以及自定义响应对象 `response`。

```typescript
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})
```

这样对于应用方来说，他们就可以捕获到这些错误的详细信息，做进一步的处理。

那么接下来，我们就来对错误信息做增强。

## 创建 AxiosError 类

我们先来定义 `AxiosError` 类型接口，用于外部使用。

`types/index.ts`：

```typescript
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
```

接着我们创建 `error.ts` 文件，然后实现 `AxiosError` 类，它是继承于 `Error` 类。

`helpers/error.ts`：

```typescript
import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
```

`AxiosError` 继承于 `Error` 类，添加了一些自己的属性：`config`、`code`、`request`、`response`、`isAxiosError` 等属性。这里要注意一点，我们使用了 `Object.setPrototypeOf(this, AxiosError.prototype)`，这段代码的目的是为了解决 TypeScript 继承一些内置对象的时候的坑，[参考](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)。

另外，为了方便使用，我们对外暴露了一个 `createError` 的工厂方法。

## createError 方法应用

修改关于错误对象创建部分的逻辑，如下：

`xhr.ts`：

```typescript
import { createError } from './helpers/error'

request.onerror = function handleError() {
  reject(createError(
    'Network Error',
    config,
    null,
    request
  ))
}

request.ontimeout = function handleTimeout() {
  reject(createError(
    `Timeout of ${config.timeout} ms exceeded`,
    config,
    'ECONNABORTED',
    request
  ))
}

function handleResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(createError(
      `Request failed with status code ${response.status}`,
      config,
      null,
      request,
      response
    ))
  }
}
```

## 导出类型定义

在 demo 中，TypeScript 并不能把 `e` 参数推断为 `AxiosError` 类型，于是我们需要手动指明类型，为了让外部应用能引入 `AxiosError` 类型，我们也需要把它们导出。

我们创建 `axios.ts` 文件，把之前的 `index.ts` 的代码拷贝过去，然后修改 `index.ts` 的代码。

`index.ts`：

```typescript
import axios from './axios'

export * from './types'

export default axios
```

这样我们在 demo 中就可以引入 `AxiosError` 类型了。

`examples/error/app.ts`：

```typescript
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
})
```

至此，我们关于 `ts-axios` 的异常处理逻辑就告一段落。下面的章节，我们会对 `ts-axios` 的接口做扩展，让它提供更多好用和方便的 API。
