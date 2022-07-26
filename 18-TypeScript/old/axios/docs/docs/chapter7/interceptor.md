# 拦截器设计与实现

## 需求分析

我们希望能对请求的发送和响应做拦截，也就是在发送请求之前和接收到响应之后做一些额外逻辑。

我们希望设计的拦截器的使用方式如下：

```typescript
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前可以做一些事情
  return config;
}, function (error) {
  // 处理请求错误
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  return response;
}, function (error) {
  // 处理响应错误
  return Promise.reject(error);
});
```

在 `axios` 对象上有一个 `interceptors` 对象属性，该属性又有 `request` 和 `response` 2 个属性，它们都有一个 `use` 方法，`use` 方法支持 2 个参数，第一个参数类似 Promise 的 `resolve` 函数，第二个参数类似 Promise 的 `reject` 函数。我们可以在 `resolve` 函数和 `reject` 函数中执行同步代码或者是异步代码逻辑。

并且我们是可以添加多个拦截器的，拦截器的执行顺序是链式依次执行的方式。对于 `request` 拦截器，后添加的拦截器会在请求前的过程中先执行；对于 `response` 拦截器，先添加的拦截器会在响应后先执行。

```typescript
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
```

此外，我们也可以支持删除某个拦截器，如下：

```typescript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/})
axios.interceptors.request.eject(myInterceptor)
```

## 整体设计

我们先用一张图来展示一下拦截器工作流程：

<img :src="$withBase('/interceptor.png')" alt="interceptor">

整个过程是一个链式调用的方式，并且每个拦截器都可以支持同步和异步处理，我们自然而然地就联想到使用 Promise 链的方式来实现整个调用过程。

在这个 Promise 链的执行过程中，请求拦截器 `resolve` 函数处理的是 `config` 对象，而相应拦截器 `resolve` 函数处理的是 `response` 对象。

在了解了拦截器工作流程后，我们先要创建一个拦截器管理类，允许我们去添加
删除和遍历拦截器。

## 拦截器管理类实现

根据需求，`axios` 拥有一个 `interceptors` 对象属性，该属性又有 `request` 和 `response` 2 个属性，它们对外提供一个 `use` 方法来添加拦截器，我们可以把这俩属性看做是一个拦截器管理对象。`use` 方法支持 2 个参数，第一个是 `resolve` 函数，第二个是 `reject` 函数，对于 `resolve` 函数的参数，请求拦截器是 `AxiosRequestConfig` 类型的，而响应拦截器是 `AxiosResponse` 类型的；而对于 `reject` 函数的参数类型则是 `any` 类型的。

根据上述分析，我们先来定义一下拦截器管理对象对外的接口。

### 接口定义

`types/index.ts`：

```typescript
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T=any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
```

这里我们定义了 `AxiosInterceptorManager` 泛型接口，因为对于 `resolve` 函数的参数，请求拦截器和响应拦截器是不同的。

### 代码实现

```typescript
import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
```

我们定义了一个 `InterceptorManager` 泛型类，内部维护了一个私有属性 `interceptors`，它是一个数组，用来存储拦截器。该类还对外提供了 3 个方法，其中 `use` 接口就是添加拦截器到 `interceptors` 中，并返回一个 `id` 用于删除；`forEach` 接口就是遍历 `interceptors` 用的，它支持传入一个函数，遍历过程中会调用该函数，并把每一个 `interceptor` 作为该函数的参数传入；`eject` 就是删除一个拦截器，通过传入拦截器的 `id` 删除。

## 链式调用实现

> 本小节需要你对 Promise 掌握和理解，可以前往 [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 学习。

当我们实现好拦截器管理类，接下来就是在 `Axios` 中定义一个 `interceptors` 属性，它的类型如下：

```typescript
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
}
```

`Interceptors` 类型拥有 2 个属性，一个请求拦截器管理类实例，一个是响应拦截器管理类实例。我们在实例化 `Axios` 类的时候，在它的构造器去初始化这个 `interceptors` 实例属性。

接下来，我们修改 `request` 方法的逻辑，添加拦截器链式调用的逻辑：

`core/Axios.ts`：

```typescript
interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

request(url: any, config?: any): AxiosPromise {
  if (typeof url === 'string') {
    if (!config) {
      config = {}
    }
    config.url = url
  } else {
    config = url
  }

  const chain: PromiseChain[] = [{
    resolved: dispatchRequest,
    rejected: undefined
  }]

  this.interceptors.request.forEach(interceptor => {
    chain.unshift(interceptor)
  })

  this.interceptors.response.forEach(interceptor => {
    chain.push(interceptor)
  })

  let promise = Promise.resolve(config)

  while (chain.length) {
    const { resolved, rejected } = chain.shift()!
    promise = promise.then(resolved, rejected)
  }

  return promise
}
```

首先，构造一个 `PromiseChain` 类型的数组 `chain`，并把 `dispatchRequest` 函数赋值给 `resolved` 属性；接着先遍历请求拦截器插入到 `chain` 的前面；然后再遍历响应拦截器插入到 `chain` 后面。

接下来定义一个已经 resolve 的 `promise`，循环这个 `chain`，拿到每个拦截器对象，把它们的 `resolved` 函数和 `rejected` 函数添加到 `promise.then` 的参数中，这样就相当于通过 Promise 的链式调用方式，实现了拦截器一层层的链式调用的效果。

注意我们拦截器的执行顺序，对于请求拦截器，先执行后添加的，再执行先添加的；而对于响应拦截器，先执行先添加的，后执行后添加的。

## demo 编写

在 `examples` 目录下创建 `interceptor` 目录，在 `interceptor` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Interceptor example</title>
  </head>
  <body>
    <script src="/__build__/interceptor.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
```

该 demo 我们添加了 3 个请求拦截器，添加了 3 个响应拦截器并删除了第二个。运行该 demo 我们通过浏览器访问，我们发送的请求添加了一个 `test` 的请求 header，它的值是 `321`；我们的响应数据返回的是 `hello`，经过响应拦截器的处理，最终我们输出的数据是 `hello13`。

至此，我们给 `ts-axios` 实现了拦截器功能，它是一个非常实用的功能，在实际工作中我们可以利用它做一些需求如登录权限认证。

我们目前通过 `axios` 发送请求，往往会传入一堆配置，但是我们也希望 `ts-axios` 本身也会有一些默认配置，我们把用户传入的自定义配置和默认配置做一层合并。其实，大部分的 JS 库都是类似的玩法。下面一章我们就来实现这个 feature。