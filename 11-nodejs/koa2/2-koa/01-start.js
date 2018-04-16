/*
# 安装koa2
$ sudo npm install koa --save-dev
*/

// 导入koa，和koa 1.x不同，在koa2中，导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use( async (ctx, next) => {
    await next();
    // ctx对象有一些简写方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');