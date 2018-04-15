/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-15 19:03:26 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-15 19:14:55
 */
'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 解析URL，通过parse()将一个字符串解析为一个Url对象
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/path/to/file',
  path: '/path/to/file?query=string',
  href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' 
}
*/
// 处理本地文件目录
var workDir = path.resolve('.'); // 解析当前目录 /Users/sunshine/Workspace/github/JavaScriptStudy/11-nodejs/koa2
console.log(workDir);
// 组合完整的文件路径
var filePath = path.join(workDir, 'pub', 'index.html'); // /Users/sunshine/Workspace/github/JavaScriptStudy/11-nodejs/koa2/pub/index.html
console.log(filePath);

/** 
 * demo: 实现文件服务器，解析request.url中的路径，本地找到对应的文件并发出
 */
// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);
// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件绝对路径
    var filepath = path.join(root, pathname);
    // 获取文件状态
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在
            console.log('200 ' + request.url);
            // 发送200响应
            response.writeHead(200);
            // 将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');




