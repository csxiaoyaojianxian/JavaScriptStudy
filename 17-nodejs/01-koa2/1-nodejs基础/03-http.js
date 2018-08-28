'use strict';

var http = require('http');

// 创建http server，并传入回调函数
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象
    // 获得HTTP请求的method和url
    console.log(request.method + ': ' + request.url);
    // 设置response
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Hello world!</h1>');
});

// 服务器监听8080端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');