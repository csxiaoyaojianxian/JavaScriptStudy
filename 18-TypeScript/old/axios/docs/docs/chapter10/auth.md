# HTTP 授权

## 需求分析

HTTP 协议中的 [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) 请求 header 会包含服务器用于验证用户代理身份的凭证，通常会在服务器返回 401 Unauthorized 状态码以及 WWW-Authenticate 消息头之后在后续请求中发送此消息头。

axios 库也允许你在请求配置中配置 `auth` 属性，`auth` 是一个对象结构，包含 `username` 和 `password` 2 个属性。一旦用户在请求的时候配置这俩属性，我们就会自动往 HTTP 的 请求 header 中添加 `Authorization` 属性，它的值为 `Basic 加密串`。
这里的加密串是 `username:password` base64 加密后的结果。

```typescript
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})
```

## 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  auth?: AxiosBasicCredentials
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
```

接着修改合并规则，因为 auth 也是一个对象格式，所以它的合并规则是 `deepMergeStrat`。

`core/mergeConfig.ts`：

```typescript
const stratKeysDeepMerge = ['headers', 'auth']
```

然后修改发送请求前的逻辑。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  auth
} = config

if (auth) {
  headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
}
```

## demo 编写

```typescript
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})
```

另外，我们在 `server.js` 中对于这个路由接口写了一段小逻辑：

```javascript
router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body)
  } else {
    res.end('UnAuthorization')
  }
})
```

注意，这里我们需要安装第三方库 `atob` 实现 base64 串的解码。

至此，`ts-axios` 支持了 HTTP 授权功能，用户可以通过配置 auth 对象实现自动在请求 header 中添加 `Authorization` 属性。下一节课我们来实现自定义合法状态码功能。
