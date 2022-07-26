# 处理响应 data

## 需求分析

在我们不去设置 `responseType` 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。例如：

```
data: "{"a":1,"b":2}"
```

我们把它转换成：

```json
data: {
  a: 1,
  b: 2
}
```

## transformResponse 函数实现及应用

根据需求分析，我们要实现一个 `transformResponse` 工具函数。

`helpers/data.ts`：

```typescript
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
```

`index.ts`：

```typescript
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
```

接着我们再去看刚才的 demo，发现我们已经把响应的 `data` 字段从字符串解析成 JSON 对象结构了。

那么至此，我们的 `ts-axios` 的基础功能已经实现完毕。不过到目前为止，我们都仅仅实现的是正常情况的逻辑，下面一章我们要处理各种异常情况的逻辑。
