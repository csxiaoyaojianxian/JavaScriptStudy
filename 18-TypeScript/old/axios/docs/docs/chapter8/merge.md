# 合并配置的设计与实现

## 需求分析

在之前的章节我们了解到，在发送请求的时候可以传入一个配置，来决定请求的不同行为。我们也希望 `ts-axios` 可以有默认配置，定义一些默认的行为。这样在发送每个请求，用户传递的配置可以和默认配置做一层合并。

和官网 `axios` 库保持一致，我们给 `axios` 对象添加一个 `defaults` 属性，表示默认配置，你甚至可以直接修改这些默认配置：

```typescript
axios.defaults.headers.common['test'] = 123
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 2000
```

其中对于 `headers` 的默认配置支持 `common` 和一些请求 `method` 字段，`common` 表示对于任何类型的请求都要添加该属性，而 `method` 表示只有该类型请求方法才会添加对应的属性。

在上述例子中，我们会默认为所有请求的 `header` 添加 `test` 属性，会默认为 `post` 请求的 `header` 添加 `Content-Type` 属性。

## 默认配置

### 默认配置定义

接下来，我们先实现默认配置

`defaults.ts`：

```typescript
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
```

我们定义了 `defaults` 常量，它包含默认请求的方法、超时时间，以及 `headers` 配置。

未来我们会根据新的需求添加更多的默认配置。

### 添加到 axios 对象中

根据需求，我们要给 `axios` 对象添加一个 `defaults` 属性，表示默认配置：

```typescript
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
  // ...
}  
``` 

我们给 `Axios` 类添加一个 `defaults` 成员属性，并且让 `Axios` 的构造函数接受一个 `initConfig` 对象，把 `initConfig` 赋值给 `this.defaults`。

接着修改 `createInstance` 方法，支持传入 `config` 对象。

```typescript
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // extend(instance, Axios.prototype, context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
```

这样我们就可以在执行 `createInstance` 创建 `axios` 对象的时候，把默认配置传入了。

## 配置合并及策略

定义了默认配置后，我们发送每个请求的时候需要把自定义配置和默认配置做合并，它并不是简单的 2 个普通对象的合并，对于不同的字段合并，会有不同的合并策略。举个例子：

```typescript
config1 = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

config2 = {
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  headers: {
    test: '321'
  }
}

merged = {
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
    test: '321'
  }
}
```

我们在 `core/mergeConfig.ts` 中实现合并方法。

### 合并方法

```typescript
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
```

合并方法的整体思路就是对 `config1` 和 `config2` 中的属性遍历，执行 `mergeField` 方法做合并，这里 `config1` 代表默认配置，`config2` 代表自定义配置。

遍历过程中，我们会通过 `config2[key]` 这种索引的方式访问，所以需要给 `AxiosRequestConfig` 的接口定义添加一个字符串索引签名：

```typescript
export interface AxiosRequestConfig {
  // ...

  [propName: string]: any
}
```

在 `mergeField` 方法中，我们会针对不同的属性使用不同的合并策略。


### 默认合并策略

这是大部分属性的合并策略，如下：

```typescript
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
```

它很简单，如果有 `val2` 则返回 `val2`，否则返回 `val1`，也就是如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置。

### 只接受自定义配置合并策略

对于一些属性如 `url`、`params`、`data`，合并策略如下：

```typescript
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
```

因为对于 `url`、`params`、`data` 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以我们只从自定义配置中获取。

### 复杂对象合并策略

对于一些属性如 `headers`，合并策略如下：

```typescript
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
```
`helpers/util.ts`：

```typescript
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
```

对于 `headers` 这类的复杂对象属性，我们需要使用深拷贝的方式，同时也处理了其它一些情况，因为它们也可能是一个非对象的普通值。未来我们讲到认证授权的时候，`auth` 属性也是这个合并策略。

最后我们在 `request` 方法里添加合并配置的逻辑：

```typescript
config = mergeConfig(this.defaults, config)
```

## flatten headers

经过合并后的配置中的 `headers` 是一个复杂对象，多了 `common`、`post`、`get` 等属性，而这些属性中的值才是我们要真正添加到请求 `header` 中的。

 举个例子：
 
```typescript
headers: {
  common: {
    Accept: 'application/json, text/plain, */*'
  },
  post: {
    'Content-Type':'application/x-www-form-urlencoded'
  }
}
```

我们需要把它压成一级的，如下：

```typescript
headers: {
  Accept: 'application/json, text/plain, */*',
 'Content-Type':'application/x-www-form-urlencoded'
}
```

这里要注意的是，对于 `common` 中定义的 `header` 字段，我们都要提取，而对于 `post`、`get` 这类提取，需要和该次请求的方法对应。

接下来我们实现 `flattenHeaders` 方法。


`helpers/header.ts`：

```typescript
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
```

我们可以通过 `deepMerge` 的方式把 `common`、`post` 的属性拷贝到 `headers` 这一级，然后再把 `common`、`post` 这些属性删掉。 

然后我们在真正发送请求前执行这个逻辑。

`core/dispatchRequest.ts`：

```typescript
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}
```

这样确保我们了配置中的 `headers` 是可以正确添加到请求 `header` 中的

## demo 编写

在 `examples` 目录下创建 `config` 目录，在 `config` 目录下创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Config example</title>
  </head>
  <body>
    <script src="/__build__/config.js"></script>
  </body>
</html>
```

接着创建 `app.ts` 作为入口文件：

```typescript
import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})
```

这个例子中我们额外引入了 `qs` 库，它是一个查询字符串解析和字符串化的库。

比如我们的例子中对于 `{a:1}` 经过 `qs.stringify` 变成 `a=1`。

由于我们的例子给默认值添加了 `post` 和 `common` 的 `headers`，我们在请求前做配置合并，于是我们请求的 `header` 就添加了 `Content-Type` 字段，它的值是 `application/x-www-form-urlencoded`；另外我们也添加了 `test2` 字段，它的值是 `123`。

至此，我们合并配置的逻辑就实现完了。我们在前面的章节编写 `axios` 的基础功能的时候对请求数据和响应数据都做了处理，官方 `axios` 则把这俩部分逻辑也做到了默认配置中，意味这用户可以去修改这俩部分的逻辑，实现自己对请求和响应数据处理的逻辑。那么下一节我们就来实现这个 feature。
