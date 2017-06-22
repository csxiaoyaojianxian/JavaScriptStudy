// 【 1 Express 框架核心特性 】
// 		可以设置中间件来响应 HTTP 请求
// 		定义了路由表用于执行不同的 HTTP 请求动作
// 		可以通过向模板传递参数来动态渲染 HTML 页面

// 【 2 安装 Express 】
// $ cnpm install express --save        # 安装 Express 并将其保存到依赖列表中
// $ cnpm install body-parser --save    # node.js 中间件，处理 JSON, Raw, Text 和 URL 编码的数据
// $ cnpm install cookie-parser --save  # Cookie 解析工具，通过 req.cookies 取cookie，并转成对象
// $ cnpm install multer --save         # node.js 中间件，处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据
// $ cnpm list express                  # 查看 express 版本号

// 【 3 request 对象 】 表示 HTTP 请求，包含请求查询字符串，参数，内容，HTTP 头部等属性，常见属性：
// req.app：当callback为外部文件时，用req.app访问express的实例
// req.baseUrl：获取路由当前安装的URL路径
// req.body / req.cookies：获得「请求主体」/ Cookies
// req.fresh / req.stale：判断请求是否还「新鲜」
// req.hostname / req.ip：获取主机名和IP地址
// req.originalUrl：获取原始请求URL
// req.params：获取路由的parameters
// req.path：获取请求路径
// req.protocol：获取协议类型
// req.query：获取URL的查询参数串
// req.route：获取当前匹配的路由
// req.subdomains：获取子域名
// req.accepts()：检查可接受的请求的文档类型
// req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
// req.get()：获取指定的HTTP请求头
// req.is()：判断请求头Content-Type的MIME类型

// 【 4 response 对象 】 表示 HTTP 响应，常见属性：
// res.app：同req.app一样
// res.append()：追加指定HTTP头
// res.set()在res.append()后将重置之前设置的头
// res.cookie(name，value [，option])：设置Cookie
// opition: domain / expires / httpOnly / maxAge / path / secure / signed
// res.clearCookie()：清除Cookie
// res.download()：传送指定路径的文件
// res.get()：返回指定的HTTP头
// res.json()：传送JSON响应
// res.jsonp()：传送JSONP响应
// res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
// res.redirect()：设置响应的Location HTTP头，并且设置状态码302
// res.send()：传送HTTP响应
// res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
// res.set()：设置HTTP头，传入object可以一次设置多个头
// res.status()：设置HTTP状态码
// res.type()：设置Content-Type的MIME类型


var express = require('express');
var app = express();

// 为应用添加静态文件处理功能，此处资源在public文件夹下
// 如可以直接访问静态资源：http://127.0.0.1:8080/images/logo.jpg
app.use(express.static('public'));

// 响应 GET 请求
app.get('/', function (req, res) {
	console.log("主页 GET 请求");
	res.send('Hello GET');
})

// 路由正则匹配
// 对页面 cs, c0s, css 等响应 GET 请求
app.get('/c*s', function(req, res) {   
	console.log("/c*s GET 请求");
	res.send('正则匹配');
})

// 渲染 HTML 页面
app.get('/index.html', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
})

// 获取 GET 参数并输出 JSON
app.get('/process_get', function (req, res) {
	// 输出 JSON 格式
	var response = {
		"first_name":req.query.first_name,
		"last_name":req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

// 获取 POST 参数并输出 JSON
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post', urlencodedParser, function (req, res) {
	// 输出 JSON 格式
	var response = {
		"first_name":req.body.first_name,
		"last_name":req.body.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

// 文件上传
var fs = require("fs");
var bodyParser = require('body-parser');
var multer  = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.post('/file_upload', function (req, res) {
	console.log(req.files[0]);  // 上传的文件信息
	var des_file = __dirname + "/" + req.files[0].originalname;
	fs.readFile( req.files[0].path, function (err, data) {
		fs.writeFile(des_file, data, function (err) {
			if( err ){
				console.log( err );
			}else{
				response = {
					message:'File uploaded successfully', 
					filename:req.files[0].originalname
				};
			}
			console.log( response );
			res.end( JSON.stringify( response ) );
		});
	});
})

// cookie
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/inf', function(req, res) {
	console.log("Cookies: ", req.cookies)
})

var server = app.listen(8080, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("访问地址为 http://%s:%s", host, port)
})