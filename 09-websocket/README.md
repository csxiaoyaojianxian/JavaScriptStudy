# websocket 学习总结

目录结构

```
|--- index.html      // 客户端程序，包括API
|--- node            // node服务端程序，包括封装程序
|--- php             // php服务端程序
|--- ws聊天室         // 聊天室demo
|--- 兼容低版本浏览器  // flash兼容版本
```

比较完善的一个nodejs版本见  JavaScriptStudy/nodejs/koa2/chatroom
此版本使用koa2框架，进行了路由处理，支持restful，支持心跳保活，支持单播广播等