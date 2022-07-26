# 自定义合法状态码

## 需求分析

之前 `ts-axios` 在处理响应结果的时候，认为 HTTP [status](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) 在 200 和 300 之间是一个合法值，在这个区间之外则创建一个错误。有些时候我们想自定义这个规则，比如认为 304 也是一个合法的状态码，所以我们希望 `ts-axios` 能提供一个配置，允许我们自定义合法状态码规则。如下：

```typescript
axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
```

通过在请求配置中配置一个 `validateStatus` 函数，它可以根据参数 `status` 来自定义合法状态码的规则。

## 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  validateStatus?: (status: number) => boolean
}
```

然后我们来修改默认配置规则。

`defaults.ts`：

```typescript
validateStatus(status: number): boolean {
  return status >= 200 && status < 300
}
```

添加默认合法状态码的校验规则。然后再请求后对响应数据的处理逻辑。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  validateStatus
} = config

function handleResponse(response: AxiosResponse): void {
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response)
  } else {
    reject(
      createError(
        `Request failed with status code ${response.status}`,
        config,
        null,
        request,
        response
      )
    )
  }
}
```

如果没有配置 `validateStatus` 以及 `validateStatus` 函数返回的值为 true 的时候，都认为是合法的，正常 `resolve(response)`，否则都创建一个错误。

## demo 编写

```typescript
axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})
```

`server.js` 中我们编写了这个路由接口

```javascript

router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})
```

接口返回 304 状态码，对于默认的请求我们会输出一条错误信息。第二个请求中我们配置了自定义合法状态码规则，区间在 200 和 400 之间，这样就不会报错，而是可以正常输出响应对象。

至此 `ts-axios` 实现了自定义合法状态码功能，用户可以配置 `validateStatus` 自定义合法状态码规则。之前有同学会质疑 `ts-axios` 对于请求 `url` 参数的序列化处理规则，下一节课我们来实现自定义参数序列化规则功能。
