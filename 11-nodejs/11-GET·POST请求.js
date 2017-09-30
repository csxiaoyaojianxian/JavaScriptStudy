
var http = require('http');

// 【 GET 请求 】
// http://localhost:8888/user?name=CS逍遥剑仙&url=www.csxiaoyao.com
// 使用 url.parse 解析 URL 中参数
var url = require('url');
var util = require('util');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	// 解析 url 参数
	var params = url.parse(req.url, true).query;
	res.write("name: " + params.name);
	res.write("\n");
	res.write("url: " + params.url);
	res.end();
}).listen(8888);

// 【 POST 请求 】
// http://localhost:8080
var querystring = require('querystring');
var postHTML = 
  '<html><head><meta charset="utf-8"><title>GET/POST</title></head>' +
  '<body>' +
  '<form method="post">' +
  'name: <input name="name"><br>' +
  'url:  <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
http.createServer(function (req, res) {
	// 定义变量暂存请求体信息
	var body = "";
	// 通过req的data事件监听函数，每当接收到请求体数据就累加到变量中
	req.on('data', function (chunk) {
		body += chunk;
	});
	// end事件触发后，通过querystring.parse将变量解析为POST请求格式向客户端返回
	req.on('end', function () {
		// 解析参数
		body = querystring.parse(body);
		// 设置响应头部信息及编码
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
		if(body.name && body.url) { // 输出提交的数据，第二次
			res.write("name: " + body.name);
			res.write("<br>");
			res.write("url: " + body.url);
		} else {  // 输出表单，第一次
			res.write(postHTML);
		}
		res.end();
	});
}).listen(8080);