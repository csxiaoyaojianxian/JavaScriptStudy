import { isDate, isPlainObject } from './util'

// 对URL进行编码
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 构建URL
export function buildURL(url: string, params?: any): string {
  // 如果没有参数，直接返回URL
  if (!params) {
    return url
  }

  const parts: string[] = []

  // 遍历传入的参数
  Object.keys(params).forEach(key => {
    const val = params[key]

    // 如果参数为 null 或者 undefined 则直接不处理
    if (val == null || typeof val === 'undefined') {
      return
    }

    // 如果参数存在数组，则进行拼接 [] 格式
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      // 反之，直接放进入组里面
      // 为了下面进行处理为 日期或者对象 格式
      values = [val]
    }

    values.forEach(val => {
      // 判断是否为日期格式
      if (isDate(val)) {
        val = val.toISOString()

        // 判断是否为对象
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      // 处理每个参数完毕，放进parts数组里面
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 把parts数组分割成 & 链接格式
  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 如果URL带有 hash 值情况，则直接去掉hash值
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 判断URL是否存在?符号链接，反之直接 & 符号链接
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
