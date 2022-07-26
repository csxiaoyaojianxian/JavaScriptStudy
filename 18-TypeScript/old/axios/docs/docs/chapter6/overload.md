# axios 函数重载

## 需求分析

目前我们的 axios 函数只支持传入 1 个参数，如下：

```typescript
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
```

我们希望该函数也能支持传入 2 个参数，如下：

```typescript
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
```

第一个参数是 `url`，第二个参数是 `config`，这个函数有点类似 `axios.get` 方法支持的参数类型，不同的是如果我们想要指定 HTTP 方法类型，仍然需要在 `config` 传入 `method`。

这就用到我们之前所学的函数重载知识点了，接下来我们来实现它。

## 重载实现

首先我们要修改 `AxiosInstance` 的类型定义。

`types/index.ts`：

```typescript
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
```

我们增加一种函数的定义，它支持 2 个参数，其中 `url` 是必选参数，`config` 是可选参数。

由于 `axios` 函数实际上指向的是 `request` 函数，所以我们来修改 `request` 函数的实现。

`core/Axios.ts`：

```typescript
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
``` 

我们把 `request` 函数的参数改成 2 个，`url` 和 `config` 都是 `any` 类型，`config` 还是可选参数。

接着在函数体我们判断 `url` 是否为字符串类型，一旦它为字符串类型，则继续对 `config` 判断，因为它可能不传，如果为空则构造一个空对象，然后把 `url` 添加到 `config.url` 中。如果 `url` 不是字符串类型，则说明我们传入的就是单个参数，且 `url` 就是 `config`，因此把 `url` 赋值给 `config`。

这里要注意的是，我们虽然修改了 `request` 的实现，支持了 2 种参数，但是我们对外提供的 `request` 接口仍然不变，可以理解为这仅仅是内部的实现的修改，与对外接口不必一致，只要保留实现兼容接口即可。

## 编写 demo

`examples/extend/app.ts`：

```typescript
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
```

我们使用了 `axios` 2 种请求方式，打开页面运行 `demo`，通过 network 我们可以看到 2 种请求都是运行正常的。

至此我们实现了 `axios` 函数的重载。官方 axios 支持了一种能力，我们可以去定义返回数据的类型，并在请求的时候指定该类型，然后在响应数据中我们就可以获取到该数据类型。下一节课我们就来实现这个 feature。
