# XSRF 防御

## 需求分析

XSRF 又名 [CSRF](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security#Cross-Site_Request_Forgery_(CSRF))，跨站请求伪造，它是前端常见的一种攻击方式，我们先通过一张图来认识它的攻击手段。

<img :src="$withBase('/xsrf.png')" alt="xsrf">

CSRF 的防御手段有很多，比如验证请求的 referer，但是 referer 也是可以伪造的，所以杜绝此类攻击的一种方式是服务器端要求每次请求都包含一个 `token`，这个 `token` 不在前端生成，而是在我们每次访问站点的时候生成，并通过 `set-cookie` 的方式种到客户端，然后客户端发送请求的时候，从 `cookie` 中对应的字段读取出 `token`，然后添加到请求 `headers` 中。这样服务端就可以从请求 `headers` 中读取这个 `token` 并验证，由于这个 `token` 是很难伪造的，所以就能区分这个请求是否是用户正常发起的。

对于我们的 `ts-axios` 库，我们要自动把这几件事做了，每次发送请求的时候，从 `cookie` 中读取对应的 `token` 值，然后添加到请求 `headers`中。我们允许用户配置 `xsrfCookieName` 和 `xsrfHeaderName`，其中 `xsrfCookieName` 表示存储 `token` 的 `cookie` 名称，`xsrfHeaderName` 表示请求 `headers` 中 `token` 对应的 `header` 名称。

```typescript
axios.get('/more/get',{
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN' // default
}).then(res => {
  console.log(res)
})
```

我们提供 `xsrfCookieName` 和 `xsrfHeaderName` 的默认值，当然用户也可以根据自己的需求在请求中去配置 `xsrfCookieName` 和 `xsrfHeaderName`。

## 代码实现

先修改 `AxiosRequestConfig` 的类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  xsrfCookieName?: string
  xsrfHeaderName?: string
}
```

然后修改默认配置。

`defaults.ts`：

```typescript
const defaults: AxiosRequestConfig = {
  // ...
  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',
}
```

接下来我们要做三件事：

- 首先判断如果是配置 `withCredentials` 为 `true` 或者是同域请求，我们才会请求 `headers` 添加 `xsrf` 相关的字段。

- 如果判断成功，尝试从 cookie 中读取 `xsrf` 的 `token` 值。

- 如果能读到，则把它添加到请求 `headers` 的 `xsrf` 相关字段中。

我们先来实现同域请求的判断。

`helpers/url.ts`：

```typescript
interface URLOrigin {
  protocol: string
  host: string
}


export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
```

同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 `href` 属性为我们传入的 `url`，然后可以获取该 DOM 的 `protocol`、`host`。当前页面的 `url` 和请求的 `url` 都通过这种方式获取，然后对比它们的 `protocol` 和 `host` 是否相同即可。

接着实现 cookie 的读取。

`helpers/cookie.ts`：

```typescript
const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
```

`cookie` 的读取逻辑很简单，利用了正则表达式可以解析到 `name` 对应的值。

最后实现完整的逻辑。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  xsrfCookieName,
  xsrfHeaderName
} = config

if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName){
  const xsrfValue = cookie.read(xsrfCookieName)
  if (xsrfValue) {
    headers[xsrfHeaderName!] = xsrfValue
  }
}
```

## demo 编写

```typescript
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})
```

`examples/server.js`：

```javascript
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
```

在访问页面的时候，服务端通过 `set-cookie` 往客户端种了 `key` 为 `XSRF-TOKEN`，值为 `1234abc` 的 `cookie`，作为 `xsrf` 的 `token` 值。

然后我们在前端发送请求的时候，就能从 cookie 中读出 `key` 为 `XSRF-TOKEN` 的值，然后把它添加到 `key` 为 `X-XSRF-TOKEN` 的请求 `headers` 中。

至此，我们实现了 XSRF 的自动防御的能力，下节课我们来实现 ts-axios 对上传和下载请求的支持。
