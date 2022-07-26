# 上传和下载的进度监控

## 需求分析

有些时候，当我们上传文件或者是请求一个大体积数据的时候，希望知道实时的进度，甚至可以基于此做一个进度条的展示。

我们希望给 `axios` 的请求配置提供 `onDownloadProgress` 和 `onUploadProgress` 2 个函数属性，用户可以通过这俩函数实现对下载进度和上传进度的监控。

```typescript
axios.get('/more/get',{
  onDownloadProgress(progressEvent) {
    // 监听下载进度
  }
})

axios.post('/more/post',{
  onUploadProgress(progressEvent) {
    // 监听上传进度
  }
})
```

`xhr` 对象提供了一个 [`progress`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) 事件，我们可以监听此事件对数据的下载进度做监控；另外，[`xhr.uplaod`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) 对象也提供了 [`progress`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) 事件，我们可以基于此对上传进度做监控。

## 代码实现

首先修改一下类型定义。

`types/index.ts`：

```typescript
export interface AxiosRequestConfig {
  // ...
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
}
```

接着在发送请求前，给 `xhr` 对象添加属性。

`core/xhr.ts`：

```typescript
const {
  /*...*/
  onDownloadProgress,
  onUploadProgress
} = config

if (onDownloadProgress) {
  request.onprogress = onDownloadProgress
}

if (onUploadProgress) {
  request.upload.onprogress = onUploadProgress
}
```

另外，如果请求的数据是 `FormData` 类型，我们应该主动删除请求 `headers` 中的 `Content-Type` 字段，让浏览器自动根据请求数据设置 `Content-Type`。比如当我们通过 `FormData` 上传文件的时候，浏览器会把请求 `headers` 中的 `Content-Type` 设置为 `multipart/form-data`。

我们先添加一个判断 `FormData` 的方法。

`helpers/util.ts`：

```typescript
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
```

然后再添加相关逻辑。

`core/xhr.ts`：

```typescript
if (isFormData(data)) {
  delete headers['Content-Type']
}
```

我们发现，`xhr` 函数内部随着需求越来越多，代码也越来越臃肿，我们可以把逻辑梳理一下，把内部代码做一层封装优化。

```typescript
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }

      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
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
  })
}
```

我们把整个流程分为 7 步：

- 创建一个 `request` 实例。
- 执行 `request.open` 方法初始化。
- 执行 `configureRequest` 配置 `request` 对象。
- 执行 `addEvents` 给 `request` 添加事件处理函数。
- 执行 `processHeaders` 处理请求 `headers`。
- 执行 `processCancel` 处理请求取消逻辑。
- 执行 `request.send` 方法发送请求。

这样拆分后整个流程就会显得非常清晰，未来我们再去新增需求的时候代码也不会显得越来越臃肿。

## demo 编写

这节课的 demo 非常有意思，我们第一次给界面上增加了一些交互的按钮。

`examples/more/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>More example</title>
  <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
</head>
<body>
<h1>file download</h1>
<div>
  <button id="download" class="btn btn-primary">Download</button>
</div>
<h1>file upload</h1>
<form role="form" class="form" onsubmit="return false;">
  <input id="file" type="file" class="form-control"/>
  <button id="upload" type="button" class="btn btn-primary">Upload</button>
</form>

<script src="/__build__/more.js"></script>
</body>
</html>
```

另外，我们为了友好地展示上传和下载进度，我们引入了一个开源库 [nprogress](https://github.com/rstacruz/nprogress)，它可以在页面的顶部展示进度条。

`examples/more/app.ts`：

```typescript
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})
```

对于 `progress` 事件参数 `e`，会有 `e.total` 和 `e.loaded` 属性，表示进程总体的工作量和已经执行的工作量，我们可以根据这 2 个值算出当前进度，然后通过 `Nprogess.set` 设置。另外，我们通过配置请求拦截器和响应拦截器执行 `NProgress.start()` 和 `NProgress.done()`。

我们给下载按钮绑定了一个 `click` 事件，请求一张图片，我们可以看到实时的进度；另外我们也给上传按钮绑定了一个 `click` 事件，上传我们选择的文件，同样也能看到实时进度。

在服务端，我们为了处理上传请求，需要下载安装一个 `express` 的中间件 `connect-multiparty`，然后使用它。

`example/server.js`：

```javascript
const multipart = require('connect-multiparty')
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})
```

这里我们需要在 `examples` 目录下创建一个 `upload-file` 的空目录，用于存放上传的文件。

通过这个中间件，我们就可以处理上传请求并且可以把上传的文件存储在 `upload-file` 目录下。

为了保证代码正常运行，我们还需要在 `examples/webpack.config.js` 中添加 `css-loader` 和 `css-loader`，不要忘记先安装它们。

至此，`ts-axios` 支持了上传下载进度事件的回调函数的配置，用户可以通过配置这俩函数实现对下载进度和上传进度的监控。下一节课我们来实现 http 的认证授权功能。

