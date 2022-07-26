# 扩展 axios.create 静态接口

## 需求分析

目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。我们希望提供了一个 `axios.create` 的静态接口允许我们创建一个新的 `axios` 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。

举个例子：

```typescript
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
```

## 静态方法扩展

由于 `axios` 扩展了一个静态接口，因此我们先来修改接口类型定义。

`types/index.ts`：

```typescript
export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosRequestConfig): AxiosInstance
}
```

`create` 函数可以接受一个 `AxiosRequestConfig` 类型的配置，作为默认配置的扩展，也可以接受不传参数。

接着我们来实现 `axios.create` 静态方法。

`axios.ts`：

```typescript
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
```

内部调用了 `createInstance` 函数，并且把参数 `config` 与 `defaults` 合并，作为新的默认配置。注意这里我们需要 `createInstance` 函数的返回值类型为 `AxiosStatic`。

## demo 编写

```typescript
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
```

我们对上节课的示例做了小小的修改，通过 `axios.create` 方法创建一个新的实例 `instance`，并传入了 `transformRequest` 和 `transformResponse` 的配置修改了默认配置，然后通过 `instance` 发送请求，效果和之前是一样的。

至此我们实现了 `axios.create` 静态接口的扩展，整个 `ts-axios` 的配置化也告一段落。官方 axios 库还支持了对请求取消的能力，在发送请求前以及请求发送出去未响应前都可以取消该请求。下一章我们就来实现这个 feature。






