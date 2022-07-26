# 取消功能的设计与实现

## 需求分析

有些场景下，我们希望能主动取消请求，比如常见的搜索框案例，在用户输入过程中，搜索框的内容也在不断变化，正常情况每次变化我们都应该向服务端发送一次请求。但是当用户输入过快的时候，我们不希望每次变化请求都发出去，通常一个解决方案是前端用 debounce 的方案，比如延时 200ms 发送请求。这样当用户连续输入的字符，只要输入间隔小于 200ms，前面输入的字符都不会发请求。

但是还有一种极端情况是后端接口很慢，比如超过 1s 才能响应，这个时候即使做了 200ms 的 debounce，但是在我慢慢输入（每个输入间隔超过 200ms）的情况下，在前面的请求没有响应前，也有可能发出去多个请求。因为接口的响应时长是不定的，如果先发出去的请求响应时长比后发出去的请求要久一些，后请求的响应先回来，先请求的响应后回来，就会出现前面请求响应结果覆盖后面请求响应结果的情况，那么就乱了。因此在这个场景下，我们除了做 debounce，还希望后面的请求发出去的时候，如果前面的请求还没有响应，我们可以把前面的请求取消。

从 axios 的取消接口设计层面，我们希望做如下的设计：

```typescript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message);
  } else {
    // 处理错误
  }
});

// 取消请求 (请求原因是可选的)
source.cancel('Operation canceled by the user.');
```

我们给 `axios` 添加一个 `CancelToken` 的对象，它有一个 `source` 方法可以返回一个 `source` 对象，`source.token` 是在每次请求的时候传给配置对象中的 `cancelToken` 属性，然后在请求发出去之后，我们可以通过 `source.cancel` 方法取消请求。

我们还支持另一种方式的调用：

``` typescript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

// 取消请求
cancel();
```

`axios.CancelToken` 是一个类，我们直接把它实例化的对象传给请求配置中的 `cancelToken` 属性，`CancelToken` 的构造函数参数支持传入一个 `executor` 方法，该方法的参数是一个取消函数 `c`，我们可以在 `executor` 方法执行的内部拿到这个取消函数 `c`，赋值给我们外部定义的 `cancel` 变量，之后我们可以通过调用这个 `cancel` 方法来取消请求。

## 异步分离的设计方案

通过需求分析，我们知道想要实现取消某次请求，我们需要为该请求配置一个 `cancelToken`，然后在外部调用一个 `cancel` 方法。

请求的发送是一个异步过程，最终会执行 `xhr.send` 方法，`xhr` 对象提供了 [`abort`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) 方法，可以把请求取消。因为我们在外部是碰不到 `xhr` 对象的，所以我们想在执行 `cancel` 的时候，去执行 `xhr.abort` 方法。

现在就相当于我们在 `xhr` 异步请求过程中，插入一段代码，当我们在外部执行 `cancel` 函数的时候，会驱动这段代码的执行，然后执行 `xhr.abort` 方法取消请求。

我们可以利用 Promise 实现异步分离，也就是在 `cancelToken` 中保存一个 `pending` 状态的 Promise 对象，然后当我们执行 `cancel` 方法的时候，能够访问到这个 Promise 对象，把它从 `pending` 状态变成 `resolved` 状态，这样我们就可以在 `then` 函数中去实现取消请求的逻辑，类似如下的代码：

```typescript

if (cancelToken) {
  cancelToken.promise
    .then(reason => {
      request.abort()
      reject(reason)
    })
}
```

## CancelToken 类实现

接下来，我们就来实现这个 `CancelToken` 类，先来看一下接口定义：

### 接口定义

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  cancelToken?: CancelToken
}

export interface CancelToken {
  promise: Promise<string>
  reason?: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

```

其中 `CancelToken` 是实例类型的接口定义，`Canceler` 是取消方法的接口定义，`CancelExecutor` 是 `CancelToken` 类构造函数参数的接口定义。

### 代码实现

我们单独创建 `cancel` 目录来管理取消相关的代码，在 `cancel` 目录下创建 `CancelToken.ts` 文件：

```typescript
import { CancelExecutor } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}
```
在 `CancelToken` 构造函数内部，实例化一个 `pending` 状态的 Promise 对象，然后用一个 `resolvePromise` 变量指向 `resolve` 函数。接着执行 `executor` 函数，传入一个 `cancel` 函数，在 `cancel` 函数内部，会调用 `resolvePromise` 把 Promise 对象从 `pending` 状态变为 `resolved` 状态。

接着我们在 `xhr.ts` 中插入一段取消请求的逻辑。

`core/xhr.ts`：

```typescript
const { /*....*/ cancelToken } = config

if (cancelToken) {
  cancelToken.promise.then(reason => {
    request.abort()
    reject(reason)
  })
}
```

这样就满足了第二种使用方式，接着我们要实现第一种使用方式，给 `CancelToken` 扩展静态接口。

## CancelToken 扩展静态接口

### 接口定义

`types/index.ts`：

```typescript
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}
```

其中 `CancelTokenSource` 作为 `CancelToken` 类静态方法 `source` 函数的返回值类型，`CancelTokenStatic` 则作为 `CancelToken` 类的类类型。

### 代码实现

`cancel/CancelToken.ts`：

```typescript
export default class CancelToken {
  // ...

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
```

`source` 的静态方法很简单，定义一个 `cancel` 变量实例化一个 `CancelToken` 类型的对象，然后在 `executor` 函数中，把 `cancel` 指向参数 `c` 这个取消函数。

这样就满足了我们第一种使用方式，但是在第一种使用方式的例子中，我们在捕获请求的时候，通过 `axios.isCancel` 来判断这个错误参数 e 是不是一次取消请求导致的错误，接下来我们对取消错误的原因做一层包装，并且把给 `axios` 扩展静态方法

## Cancel 类实现及 axios 的扩展

### 接口定义

```typescript
export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
```

其中 `Cancel` 是实例类型的接口定义，`CancelStatic` 是类类型的接口定义，并且我们给 `axios` 扩展了多个静态方法。

### 代码实现

我在 `cancel` 目录下创建 `Cancel.ts` 文件。

```typescript
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
```

`Cancel` 类非常简单，拥有一个 `message` 的公共属性。`isCancel` 方法也非常简单，通过 `instanceof` 来判断传入的值是不是一个 `Cancel` 对象。

接着我们对 `CancelToken` 类中的 `reason` 类型做修改，把它变成一个 `Cancel` 类型的实例。

先修改定义部分。

`types/index.ts`：

```typescript
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
}
```

再修改实现部分：

```typescript
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
}
```

接下来我们给 `axios` 扩展一些静态方法，供用户使用。

`axios.ts`：

```typescript
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
```

## 额外逻辑实现

除此之外，我们还需要实现一些额外逻辑，比如当一个请求携带的 `cancelToken` 已经被使用过，那么我们甚至都可以不发送这个请求，只需要抛一个异常即可，并且抛异常的信息就是我们取消的原因，所以我们需要给 `CancelToken` 扩展一个方法。

先修改定义部分。

`types/index.ts`：

```typescript
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
```

添加一个 `throwIfRequested` 方法，接下来实现它：

`cancel/CancelToken.ts`：

```typescript
export default class CancelToken {
  // ...

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
```

判断如果存在 `this.reason`，说明这个 `token` 已经被使用过了，直接抛错。

接下来在发送请求前增加一段逻辑。

`core/dispatchRequest.ts`：

```typescript
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)

  // ...
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
```

发送请求前检查一下配置的 cancelToken 是否已经使用过了，如果已经被用过则不用法请求，直接抛异常。

## demo 编写

在 `examples` 目录下创建 `cancel` 目录，在 `cancel` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cancel example</title>
  </head>
  <body>
    <script src="/__build__/cancel.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
```

我们的 demo 展示了 2 种使用方式，也演示了如果一个 token 已经被使用过，则再次携带该 token 的请求并不会发送。

至此，我们完成了 `ts-axios` 的请求取消功能，我们巧妙地利用了 Promise 实现了异步分离。目前官方 `axios` 库的一些大的 feature 我们都已经实现了，下面的章节我们就开始补充完善 `ts-axios` 的其它功能。







