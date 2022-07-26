# 静态方法扩展

## 需求分析

官方 axios 库实现了 `axios.all`、`axios.spread` 等方法，它们的用法如下：

```typescript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

实际上，`axios.all` 就是 `Promise.all` 的封装，它返回的是一个 `Promise` 数组，`then` 函数的参数本应是一个参数为 `Promise resolves`（数组）的函数，在这里使用了 `axios.spread` 方法。所以 `axios.spread` 方法是接收一个函数，返回一个新的函数，新函数的结构满足 `then` 函数的参数结构。

个人认为 `axios` 这俩静态方法在目前看来很鸡肋，因为使用 `Promise` 一样可以完成这俩需求。

```typescript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(([acct,perms]) {
    // Both requests are now complete
  }));
```
在 `Promise.all` 的 `resolve` 函数中，我们可以直接通过数组的解构拿到每个请求对应的响应对象。

但是为了保持与官网 axios API 一致，我们也在 `ts-axios` 库中实现这俩方法。

官方 axios 库也通过 `axios.Axios` 对外暴露了 `Axios` 类(感觉也没有啥使用场景，但为了保持一致，我们也会实现)。

另外对于 axios 实例，官网还提供了 `getUri` 方法在不发送请求的前提下根据传入的配置返回一个 url，如下：

```typescript
const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
// https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest
```

## 代码实现

首先修改类型定义。

`types/index.ts`：

```typescript
export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
  // ...

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic
}

export interface Axios {
  // ...

  getUri(config?: AxiosRequestConfig): string
}
```

然后我们去实现这几个静态方法。

`axios.ts`：

```typescript
axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
```

最后我们去给 Axios 添加实例方法 `getUri`。

`core/Axios.ts`：

```typescript
getUri(config?: AxiosRequestConfig): string {
  config = mergeConfig(this.defaults, config)
  return transformURL(config)
}
```

先和默认配置合并，然后再通过 `dispatchRequest` 中实现的 `transformURL` 返回一个新的 `url`。

## demo 编写

```typescript
function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))


axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
```

这里我们通过 `axios.all` 同时发出了 2 个请求，返回了 `Promise` 数组，，我们可以在 `axios.spread` 的参数函数中拿到结果，也可以直接在 then 函数的参数函数中拿到结果。另外，我们可以根据 `axios.getUri` 方法在不发送请求的情况下根据配置得到最终请求的 url 结果。

至此，`ts-axios` 就实现了官网 axios 库在浏览器端的所有需求。如果你学到了这里，先为自己鼓个掌吧，因为我们已经获得了阶段性的学习成果了。

目前为止，我们对于所写代码的验证都是通过 demo 的方式，但是 demo 毕竟难以覆盖所有场景和代码分支，为了保证代码的正确性，我们还需要更科学的方式。从下一章开始，我们会学习编写单元测试，通过单元测试的方式来保证我们的代码正确性。