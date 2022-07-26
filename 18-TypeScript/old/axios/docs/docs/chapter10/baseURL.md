# baseURL

## 需求分析

有些时候，我们会请求某个域名下的多个接口，我们不希望每次发送请求都填写完整的 url，希望可以配置一个 `baseURL`，之后都可以传相对路径。如下：

```typescript
const instance = axios.create({
  baseURL: 'https://some-domain.com/api'
})

instance.get('/get')

instance.post('/post')
```

我们一旦配置了 `baseURL`，之后请求传入的 `url` 都会和我们的 `baseURL` 拼接成完整的绝对地址，除非请求传入的 `url` 已经是绝对地址。

## 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  baseURL?: string
}
```

接下来实现 2 个辅助函数。

`helpers/url.ts`：

```typescript
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
```

最后我们来调用这俩个辅助函数。

`core/dispatchRequest.ts`：

```typescript
function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}
```

## demo 编写

```typescript
const instance = axios.create({
  baseURL: 'https://img.mukewang.com/'
})

instance.get('5cc01a7b0001a33718720632.jpg')

instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')
```

这个 demo 非常简单，我们请求了慕课网的 2 张图片，注意当第二个请求 `url` 已经是绝对地址的时候，我们并不会再去拼接 `baseURL`。

至此，`ts-axios` 就实现了 `baseURL` 的配置功能，接下来我们来实现 `ts-axios` 的静态方法扩展。