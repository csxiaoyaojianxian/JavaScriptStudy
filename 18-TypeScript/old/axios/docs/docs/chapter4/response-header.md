# 处理响应 header

## 需求分析

我们通过 `XMLHttpRequest` 对象的 `getAllResponseHeaders` 方法获取到的值是如下一段字符串：

```
date: Fri, 05 Apr 2019 12:40:49 GMT
etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
connection: keep-alive
x-powered-by: Express
content-length: 13
content-type: application/json; charset=utf-8
```

每一行都是以回车符和换行符 `\r\n` 结束，它们是每个 `header` 属性的分隔符。对于上面这串字符串，我们希望最终解析成一个对象结构：

```json
{
  date: 'Fri, 05 Apr 2019 12:40:49 GMT'
  etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
  connection: 'keep-alive',
  'x-powered-by': 'Express',
  'content-length': '13'
  'content-type': 'application/json; charset=utf-8'
}
```

## parseHeaders 函数实现及应用

根据需求分析，我们要实现一个 `parseHeaders` 工具函数。

`helpers/headers.ts`：

```typescript
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
```
然后我们使用这个工具函数：

`xhr.ts`：

```typescript
const responseHeaders = parseHeaders(request.getAllResponseHeaders())
```

接着我们再去看刚才的 demo，发现我们已经把响应的 `headers` 字段从字符串解析成对象结构了。那么接下来，我们在解决之前遗留的第二个问题：对响应 `data` 字段的处理。