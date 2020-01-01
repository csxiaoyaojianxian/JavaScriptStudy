export type Method = 'get' | 'Get'
                  | 'delete' | 'DELETE'
                  | 'head' | 'HEAD'
                  | 'options' | 'OPTIONS'
                  | 'post' | 'POST'
                  | 'put' | 'PUT'
                  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any // post、patch 等类型请求的数据，放到 request body 中
  params?: any // get、head 等类型请求的数据，拼接到 url 的 query string 中
  headers?: any
  responseType?: XMLHttpRequestResponseType // "" | "arraybuffer" | "blob" | "document" | "json" | "text" 字符串字面量类型
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 当 axios 返回的是 AxiosPromise 类型，那么 resolve 函数中的参数就是一个 AxiosResponse 类型
export interface AxiosPromise extends Promise<AxiosResponse> {

}
