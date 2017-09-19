/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-15 14:24:29
*/
var responseCode = function(code){
  switch(code){
    case 4900:
      return {msg:"未知错误"};
      break;
    case 4101:
      return {msg:"用户鉴权失败",act:"window.location.href='login.html'"};
      break;
    case 4102:
      return {msg:"用户已存在"};
      break;
    case 4103:
      return {msg:"用户不存在"};
      break;
    case 4104:
      return {msg:"密码错误"};
      break;
    case 4105:
      return {msg:"手机号输入为空或非法"};
      break;
    case 4106:
      return {msg:"密码输入为空或非法"};
      break;
    case 4107:
      return {msg:"用户名输入为空或非法"};
      break;
    case 4300:
      return {msg:"文献未找到"};
      break;
    case 4301:
      return {msg:"作者输入为空或非法"};
      break;
    case 4302:
      return {msg:"标题输入为空或非法"};
      break;
    case 4303:
      return {msg:"出版社输入为空或非法"};
      break;
    case 4304:
      return {msg:"出版时间输入为空或非法"};
      break;
    case 4305:
      return {msg:"不合法的页号输入"};
      break;
    case 4309:
      return {msg:"搜索关键词输入为空或非法"};
      break;
    case 4310:
      return {msg:"期刊输入为空或非法"};
      break;
    case 4401:
      return {msg:"不合法的评分输入"};
      break;
    case 4406:
      return {msg:"评论内容输入为空或非法"};
      break;
    case 4407:
      return {msg:"不合法的BibTeX输入"};
      break;
    case 4501:
      return {msg:"页号溢出"};
      break;
    case 4502:
      return {msg:"已到最后"};
      break;
    case 4503:
      return {msg:"已到最前"};
      break;
    case 4601:
      return {msg:"不能删除他人的评论"};
      break;
    case 4602:
      return {msg:"评论不存在"};
      break;
    case 4603:
      return {msg:"尚未收藏"};
      break;
    case 4700:
      return {msg:"评阅未找到"};
      break;
    case 4701:
      return {msg:"评阅内容不可为空"};
      break;
    default:
      return {msg:"未知状态"};
      break;
  }
  return 0;
}