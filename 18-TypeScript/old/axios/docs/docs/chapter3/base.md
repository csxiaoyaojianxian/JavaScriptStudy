# 编写基础请求代码

我们这节课开始编写 `ts-axios` 库，我们的目标是实现简单的发送请求功能，即客户端通过 `XMLHttpRequest` 对象把请求发送到 server 端，server 端能收到请求并响应即可。

我们实现 `axios` 最基本的操作，通过传入一个对象发送请求，如下：

```typescript
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

## 创建入口文件

我们删除 `src` 目录下的文件，先创建一个 `index.ts` 文件，作为整个库的入口文件，然后我们先定义一个 `axios` 方法，并把它导出，如下：

```typescript

function axios(config) {

}

export default axios

```

这里 TypeScript 编译器会检查到错误，分别是 `config` 的声明上有隐含的 `any` 报错，以及代码块为空。代码块为空我们比较好理解，第一个错误的原因是因为我们给 TypeScript 编译配置的 `strict` 设置为 `true` 导致。

### 编译配置文件 tsconfig.json

`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项，关于它的具体学习，我希望同学们去[官网](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)系统学习一下

我们在之前讲 TypeScript 的基础时，会运行 `tsc` 命令去编译 TypeScript 文件，编译器会从当前目录开始去查找 `tsconfig.json` 文件，作为编译时的一些编译选项。

我们来看一下 tsconfig.json 文件，它包含了很多编译时的配置，其中我们把 `strict` 设置为 `true`，它相当于启用所有严格类型的检查选项。启用 `--strict` 相当于启用 `--noImplicitAny`,`--noImplicitThis`,`--alwaysStrict`，`--strictNullChecks` 和 `--strictFunctionTypes` 和 `--strictPropertyInitialization`。

我们讲 TypeScript 的基础时提到了 `--strictNullChecks`，其它的编译配置我建议同学们都去查看它的[官网文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)，把它当做手册去查阅即可。

### 定义 AxiosRequestConfig 接口类型

接下来，我们需要给 `config` 参数定义一种接口类型。我们创建一个 `types` 目录，在下面创建一个 `index.ts` 文件，作为我们项目中公用的类型定义文件。

接下来我们来定义 `AxiosRequestConfig` 接口类型：

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: string
  data?: any
  params?: any
}
```

其中，`url` 为请求的地址，必选属性；而其余属性都是可选属性。`method` 是请求的 HTTP 方法；`data` 是 `post`、`patch` 等类型请求的数据，放到 `request body` 中的；`params` 是 `get`、`head` 等类型请求的数据，拼接到 `url` 的 `query string` 中的。

为了让 `method` 只能传入合法的字符串，我们定义一种字符串字面量类型 `Method`：

```typescript
export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
```

接着我们把 `AxiosRequestConfig` 中的 `method` 属性类型改成这种字符串字面量类型：

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
```

然后回到 `index.ts`，我们引入 `AxiosRequestConfig` 类型，作为 `config` 的参数类型，如下：

```typescript
import { AxiosRequestConfig } from './types'

function axios(config: AxiosRequestConfig) {
}

export default axios
```

那么接下来，我们就来实现这个函数体内部的逻辑——发送请求。

## 利用 XMLHttpRequest 发送请求

我们并不想在 `index.ts` 中去实现发送请求的逻辑，我们利用模块化的编程思想，把这个功能拆分到一个单独的模块中。

于是我们在 `src` 目录下创建一个 `xhr.ts` 文件，我们导出一个 `xhr` 方法，它接受一个 `config` 参数，类型也是 `AxiosRequestConfig` 类型。

```typescript
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
}
```

接下来，我们来实现这个函数体逻辑，如下：

```typescript
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
```

我们首先通过解构赋值的语法从 `config` 中拿到对应的属性值赋值给我的变量，并且还定义了一些默认值，因为在 `AxiosRequestConfig` 接口的定义中，有些属性是可选的。

接着我们实例化了一个 `XMLHttpRequest` 对象，然后调用了它的 `open` 方法，传入了对应的一些参数，最后调用 `send` 方法发送请求。

对于 `XMLHttpRequest` 的学习，我希望同学们去 [mdn](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 上系统地学习一下它的一些属性和方法，当做参考资料，因为在后续的开发中我们可能会反复查阅这些文档资料。

### 引入 xhr 模块

编写好了 `xhr` 模块，我们就需要在 `index.ts` 中去引入这个模块，如下：

```typescript
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
```

那么至此，我们基本的发送请求代码就编写完毕了，接下来我们来写一个小 demo，来使用我们编写的 axios 库去发送请求。

## demo 编写

我们会利用 Node.js 的 [`express`](http://expressjs.com/) 库去运行我们的 demo，利用 [`webpack`](https://webpack.js.org/) 来作为 demo 的构建工具。

### 依赖安装

我们先来安装一些编写 demo 需要的依赖包，如下：

```
"webpack": "^4.28.4",
"webpack-dev-middleware": "^3.5.0",
"webpack-hot-middleware": "^2.24.3",
"ts-loader": "^5.3.3",
"tslint-loader": "^3.5.4",
"express": "^4.16.4",
"body-parser": "^1.18.3"
```

其中，`webpack` 是打包构建工具，`webpack-dev-middleware` 和 `webpack-hot-middleware` 是 2 个 `express` 的 `webpack` 中间件，`ts-loader` 和 `tslint-loader` 是 `webpack` 需要的 TypeScript 相关 loader，`express` 是 Node.js 的服务端框架，`body-parser` 是 `express` 的一个中间件，解析 `body` 数据用的。

### 编写 webpack 配置文件

在 `examples` 目录下创建 `webpack` 配置文件 `webpack.config.js`：

```javascript
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```

### 编写 server 文件

在 `examples` 目录下创建 `server.js` 文件：

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
```

### 编写 demo 代码

首先在 `examples` 目录下创建 `index.html` 和 `global.css`，作为所有 `demo` 的入口文件已全局样式文件。

`index.html`：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ts-axios examples</title>
    <link rel="stylesheet" href="/global.css">
  </head>
  <body style="padding: 0 20px">
    <h1>ts-axios examples</h1>
    <ul>
      <li><a href="simple">Simple</a></li>
    </ul>
  </body>
</html>
```

`global.css`：

```css
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #2c3e50;
}

ul {
  line-height: 1.5em;
  padding-left: 1.5em;
}

a {
  color: #7f8c8d;
  text-decoration: none;
}

a:hover {
  color: #4fc08d;
}
```

然后在 `examples` 目录下创建 `simple` 目录，作为本章节的 demo 目录，在该目录下再创建 `index.html` 和 `app.ts` 文件

`index.html` 文件如下:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple example</title>
  </head>
  <body>
    <script src="/__build__/simple.js"></script>
  </body>
</html>
```

`app.ts` 文件如下：

```typescript
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

因为我们这里通过 `axios` 发送了请求，那么我们的 server 端要实现对应的路由接口，我们来修改 `server.js`，添加如下代码：

```javascript
const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(router)
```

### 运行 demo

接着我们在 `package.json` 中去新增一个 `npm script`：

```
"dev": "node examples/server.js"
```

然后我们去控制台执行命令

```bash
npm run dev
```

相当于执行了 `node examples/server.js`，会开启我们的 server。

接着我们打开 chrome 浏览器，访问 `http://localhost:8080/` 即可访问我们的 demo 了，我们点到 `Simple` 目录下，通过开发者工具的 network 部分我们可以看到成功发送到了一条请求，并在 response 中看到了服务端返回的数据。

至此，我们就实现了一个简单的请求发送，并编写了相关的 demo。但是现在存在一些问题：我们传入的 `params` 数据并没有用，也没有拼接到 `url` 上；我们对 request body 的数据格式、请求头 headers 也没有做处理；另外我们虽然从网络层面收到了响应的数据，但是我们代码层面也并没有对响应的数据做处理。那么下面一章，我们就来解决这些问题。
