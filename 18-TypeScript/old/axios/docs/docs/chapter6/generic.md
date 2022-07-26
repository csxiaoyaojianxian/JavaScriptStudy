# 响应数据支持泛型

## 需求分析

通常情况下，我们会把后端返回数据格式单独放入一个接口中：

```typescript
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number

  /**
   * 数据
   * @type { T }
   */
  result: T

  /**
   * 消息
   * @type { string }
   */
  message: string
}
```

我们可以把 API 抽离成单独的模块：

```typescript
import { ResponseData } from './interface.ts';

export function getUser<T>() {
  return axios.get<ResponseData<T>>('/somepath')
    .then(res => res.data)
    .catch(err => console.error(err))
}
```

接着我们写入返回的数据类型 `User`，这可以让 TypeScript 顺利推断出我们想要的类型：

```typescript
interface User {
  name: string
  age: number
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>()
}
```

## 接口添加泛型参数

根据需求分析，我们需要给相关的接口定义添加泛型参数。

`types/index.ts`：

```typescript
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
```

这里我们先给 `AxiosResponse` 接口添加了泛型参数 `T`，`T=any` 表示泛型的类型参数默认值为 `any`。

接着我们为 `AxiosPromise`、`Axios` 以及 `AxiosInstance` 接口都加上了泛型参数。我们可以看到这些请求的返回类型都变成了 `AxiosPromise<T>`，也就是 `Promise<AxiosResponse<T>>`，这样我们就可以从响应中拿到了类型 `T` 了。

## demo 编写

`examples/extend/app.ts`：

```typescript
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
```

当我们调用 `getUser<User>` 的时候，相当于调用了 `axios<ResponseData<User>>`，也就是我们传入给 `axios` 函数的类型 `T` 为 `ResponseData<User>`；相当于返回值 `AxiosPromise<T>` 的 `T`，实际上也是 `Promise<AxiosResponse<T>>` 中的 `T` 的类型是 `ResponseData<User>`，所以响应数据中的 `data` 类型就是 `ResponseData<User>`，也就是如下数据结构：

```json
{
  code: number
  result: User
  message: string
}
```

这个也是 `const user = await getUser<User>()` 返回值 `user` 的数据类型，所以 TypeScript 能正确推断出 `user` 的类型。

至此，我们的 `ts-axios` 接口扩展章节就告一段落了，下一章我们来实现 `axios` 的一个非常好用的功能 —— 拦截器。
