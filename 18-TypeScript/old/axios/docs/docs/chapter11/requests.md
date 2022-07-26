# 请求模块单元测试

请求模块是 axios 最基础的模块，通过一个 axios 方法发送 Ajax 请求。

## jasmine-ajax

[Jasmine](https://jasmine.github.io/pages/getting_started.html) 是一个 BDD(行为驱动开发)的测试框架，它有很多成熟的插件，比如我们要用到的 [`jasmine-ajax`](https://github.com/jasmine/jasmine-ajax)，它会为我们发出的 Ajax 请求根据规范定义一组假的响应，并跟踪我们发出的Ajax请求，可以让我们方便的为结果做断言。

其实 Jest 也可以去写插件，但并没有现成的 Ajax 相关的 Jest 插件，但是 Jest 测试中我们仍然可以使用 Jasmine 相关的插件，只需要做一些小小的配置即可。

当然，未来我也会考虑去编写一个 Ajax 相关的 Jest 插件，目前我们仍然使用 `jasmine-ajax` 去配合我们编写测试。

`jasmine-ajax` 依赖 `jasmine-core`，因此首先我们要安装几个依赖包，`jasmine-ajax`、`jasmine-core` 和 `@types/jasmine-ajax`。

这个时候我们需要去修改 `test/boot.ts` 文件，因为每次跑具体测试代码之前会先运行该文件，我们可以在这里去初始化 `jasmine-ajax`。

```typescript
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
```

这里为了让 `jasmine-ajax` 插件运行成功，我们需要手动添加全局的 `getJasmineRequireObj` 方法，参考 [issue](https://github.com/jasmine/jasmine-ajax/issues/178)。

接下来，我们就开始编写请求模块的单元测试。

## 测试代码编写

`test/requests.spec.ts`：

```typescript
import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should treat single string arg as url', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', done => {
    axios({
      url: '/foo',
      method: 'POST'
    }).then(response => {
      expect(response.config.method).toBe('post')
      done()
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  test('should reject on network errors', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    jasmine.Ajax.uninstall()

    axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()

      done()
    }
  })

  test('should reject when request timeout', done => {
    let err: AxiosError

    axios('/foo', {
      timeout: 2000,
      method: 'post'
    }).catch(error => {
      err = error
    })

    getAjaxRequest().then(request => {
      // @ts-ignore
      request.eventBus.trigger('timeout')

      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })

  test('should reject when validateStatus returns false', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosError | AxiosResponse) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).response!.status).toBe(500)

      done()
    }
  })

  test('should resolve when validateStatus returns true', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status === 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(res: AxiosResponse | AxiosError) {
      expect(resolveSpy).toHaveBeenCalled()
      expect(rejectSpy).not.toHaveBeenCalled()
      expect(res.config.url).toBe('/foo')

      done()
    }
  })

  test('should return JSON when resolved', done => {
    let response: AxiosResponse

    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"a": 1}'
      })

      setTimeout(() => {
        expect(response.data).toEqual({ a: 1 })
        done()
      }, 100)
    })
  })

  test('should return JSON when rejecting', done => {
    let response: AxiosResponse

    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).catch(error => {
      response = error.response
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{"error": "BAD USERNAME", "code": 1}'
      })

      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.error).toBe('BAD USERNAME')
        expect(response.data.code).toBe(1)
        done()
      }, 100)
    })
  })

  test('should supply correct response', done => {
    let response: AxiosResponse

    axios.post('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })

      setTimeout(() => {
        expect(response.data.foo).toBe('bar')
        expect(response.status).toBe(200)
        expect(response.statusText).toBe('OK')
        expect(response.headers['content-type']).toBe('application/json')
        done()
      }, 100)
    })
  })

  test('should allow overriding Content-Type header case-insensitive', () => {
    let response: AxiosResponse

    axios
      .post(
        '/foo',
        { prop: 'value' },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      .then(res => {
        response = res
      })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/json')
    })
  })
})
```

我们要注意的一些点，在这里列出：

- beforeEach & afterEach

[beforeEach](https://jestjs.io/docs/en/api#beforeeachfn-timeout)表示每个测试用例运行前的钩子函数，在这里我们执行 `jasmine.Ajax.install()` 安装 `jasmine.Ajax`。

[afterEach](https://jestjs.io/docs/en/api#aftereachfn-timeout)表示每个测试用例运行后的钩子函数，在这里我们执行 `jasmine.Ajax.uninstall()` 卸载 `jasmine.Ajax`。

- `getAjaxRequest`

`getAjaxRequest` 是我们在 `test/helper.ts` 定义的一个辅助方法，通过 `jasmine.Ajax.requests.mostRecent()` 拿到最近一次请求的 `request` 对象，这个 `request` 对象是 `jasmine-ajax` 库伪造的 `xhr` 对象，它模拟了 `xhr` 对象上的方法，并且提供一些 `api` 让我们使用，比如 `request.respondWith` 方法返回一个响应。

- 异步测试

注意到我们这里大部分的测试用例不再是同步的代码了，几乎都是一些异步逻辑，Jest 非常好地支持[异步测试代码](https://jestjs.io/docs/en/asynchronous)。通常有 2 种解决方案。

第一种是利用 `done` 参数，每个测试用例函数有一个 `done` 参数，一旦我们使用了该参数，只有当 `done` 函数执行的时候表示这个测试用例结束。

第二种是我们的测试函数返回一个 Promise 对象，一旦这个 Promise 对象 `resolve` 了，表示这个测试结束。

- expect.any(constructor)

它表示匹配任意由 `constructor` 创建的对象实例。

- `request.eventBus.trigger`

由于 `request.responseTimeout` 方法内部依赖了 `jasmine.clock` 方法会导致运行失败，这里我直接用了 `request.eventBus.trigger('timeout')` 方法触发了 `timeout` 事件。因为这个方法不在接口定义中，所以需要加 `// @ts-ignore`。


另外，我们在测试中发现 2 个 case 没有通过。

第一个是 `should treat method value as lowercase string`，这个测试用例是我们发送请求的 ` method` 需要转换成小写字符串，这么做的目的也是为了之后 `flattenHeaders` 能正常处理这些 `method`，所以我们需要修改源码逻辑。

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

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()
    
    // ...
  }
```

在合并配置后，我们需要把 `config.method` 转成小写字符串。

另一个是 `should return JSON when rejecting`，这个测试用例是当我们发送请求失败后，也能把响应数据转换成 JSON 格式，所以也需要修改源码逻辑。

`core/dispatchRequest.ts`：

```typescript
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}
```

除了对正常情况的响应数据做转换，我们也需要对异常情况的响应数据做转换。

至此我们完成了 `ts-axios` 库对请求模块的测试，下一节课我们会从业务的角度来测试 `headers` 模块。
