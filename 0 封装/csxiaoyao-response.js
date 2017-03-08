/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-08 19:40:52
*/
var responseCode = function(code){
  switch(code){
    // 1xx（临时响应） 表示临时响应并需要请求者继续执行操作的状态代码
    case 100:
      // 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。
      return {msg:"继续"};
      break;
    case 101:
      // 请求者已要求服务器切换协议，服务器已确认并准备切换。
      return {msg:"切换协议"};
      break;
    // 2xx （成功） 表示成功处理了请求的状态代码。
    case 200:
      // 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 
      return {msg:"成功"};
      break;
    case 201:
      // 请求成功并且服务器创建了新的资源。
      return {msg:"已创建"};
      break;
    case 202:
      // 服务器已接受请求，但尚未处理。 
      return {msg:"已接受"};
      break;
    case 203:
      // 服务器已成功处理了请求，但返回的信息可能来自另一来源。
      return {msg:"非授权信息"};
      break;
    case 204:
      // 服务器成功处理了请求，但没有返回任何内容。 
      return {msg:"无内容"};
      break;
    case 205:
      // 服务器成功处理了请求，但没有返回任何内容。 
      return {msg:"重置内容"};
      break;
    case 206:
      // 服务器成功处理了部分 GET 请求。
      return {msg:"部分内容"};
      break;
    // 3xx （重定向） 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。
    case 300:
      // 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。
      return {msg:"多种选择"};
      break;
    case 301:
      // 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
      return {msg:"永久移动"};
      break;
    case 302:
      // 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
      return {msg:"临时移动"};
      break;
    case 303:
      // 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。 
      return {msg:"查看其他位置"};
      break;
    case 304:
      // 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 
      return {msg:"未修改"};
      break;
    case 305:
      // 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。 
      return {msg:"使用代理"};
      break;
    case 307:
      // 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
      return {msg:"临时重定向"};
      break;
    // 4xx（请求错误） 这些状态代码表示请求可能出错，妨碍了服务器的处理。
    case 400:
      // 服务器不理解请求的语法。 
      return {msg:"错误请求"};
      break;
    case 401:
      // 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。 
      return {msg:"未授权"};
      break;
    case 403:
      // 服务器拒绝请求。
      return {msg:"禁止"};
      break;
    case 404:
      // 服务器找不到请求的网页。 
      return {msg:"未找到"};
      break;
    case 405:
      // 禁用请求中指定的方法。 
      return {msg:"方法禁用"};
      break;
    case 406:
      // 无法使用请求的内容特性响应请求的网页。 
      return {msg:"不接受"};
      break;
    case 407:
      // 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。 
      return {msg:"需要代理授权"};
      break;
    case 408:
      // 服务器等候请求时发生超时。 
      return {msg:"请求超时"};
      break;
    case 409:
      // 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。 
      return {msg:"冲突"};
      break;
    case 410:
      // 如果请求的资源已永久删除，服务器就会返回此响应。 
      return {msg:"已删除"};
      break;
    case 411:
      // 服务器不接受不含有效内容长度标头字段的请求。 
      return {msg:"需要有效长度"};
      break;
    case 412:
      // 服务器未满足请求者在请求中设置的其中一个前提条件。 
      return {msg:"未满足前提条件"};
      break;
    case 413:
      // 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。 
      return {msg:"请求实体过大"};
      break;
    case 414:
      // 请求的 URI（通常为网址）过长，服务器无法处理。 
      return {msg:"请求的 URI 过长"};
      break;
    case 415:
      // 请求的格式不受请求页面的支持。
      return {msg:"不支持的媒体类型"};
      break;
    case 416:
      // 如果页面无法提供请求的范围，则服务器会返回此状态代码。
      return {msg:"请求范围不符合要求"};
      break;
    case 417:
      // 服务器未满足”期望”请求标头字段的要求。
      return {msg:"未满足期望值"};
      break;
    // 5xx（服务器错误） 这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。
    case 500:
      // 服务器遇到错误，无法完成请求。
      return {msg:"服务器内部错误"};
      break;
    case 501:
      // 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。 
      return {msg:"尚未实施"};
      break;
    case 502:
      // 服务器作为网关或代理，从上游服务器收到无效响应。 
      return {msg:"错误网关"};
      break;
    case 503:
      // 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。 
      return {msg:"服务不可用"};
      break;
    case 504:
      // 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
      return {msg:"网关超时"};
      break;
    case 505:
      // 服务器不支持请求中所用的 HTTP 协议版本。
      return {msg:"HTTP 版本不受支持"};
      break;
    default:
      return {msg:"未知状态"};
      break;
  }
  return 0;
}