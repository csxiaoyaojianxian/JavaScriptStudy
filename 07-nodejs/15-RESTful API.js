
// REST即表述性状态传递（英文：Representational State Transfer，简称REST），满足这些约束条件和原则的应用程序或设计就是RESTful

// 【 HTTP 方法 】
// GET - 用于获取数据
// PUT - 用于更新或添加数据
// DELETE - 用于删除数据
// POST - 用于添加数据

// 【 创建 RESTful 】
// 见 15-user.json

// 【 RESTful API 】
// * URI       * HTTP方法  * 发送内容   * 结果
// listUsers   GET        空          显示所有用户列表
// addUser     POST       JSON字符串	  添加新用户
// deleteUser  DELETE     JSON字符串   删除用户
// :id         GET        空          显示用户详细信息


var express = require('express');
var app = express();
var fs = require("fs");

// 【 1 获取用户列表 】
app.get('/listUsers', function (req, res) {
	fs.readFile( __dirname + "/" + "15-user.json", 'utf8', function (err, data) {
		console.log( data );
		res.end( data );
	});
})

// 【 添加用户 】
var user = { //添加的新用户数据
	"user4" : {
		"name" : "sun",
		"password" : "password4",
		"id": 4
	}
}
app.get('/addUser', function (req, res) {
	// 读取已存在的数据
	fs.readFile( __dirname + "/" + "15-user.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		data["user4"] = user["user4"];
		console.log( data );
		res.end( JSON.stringify(data));
	});
})

// 【 删除用户 】
var id = 2; // 删除用户id
app.get('/deleteUser', function (req, res) {
	console.log("sunshine");
	fs.readFile( __dirname + "/" + "15-user.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		delete data["user" + id];
		console.log( data );
		res.end( JSON.stringify(data));
	});
})

// 【 显示用户详情 】
app.get('/:id', function (req, res) {
	// 首先我们读取已存在的用户
	fs.readFile( __dirname + "/" + "15-user.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		var user = data["user" + req.params.id] 
		console.log( user );
		res.end( JSON.stringify(user));
	});
})
// 浏览器访问 http://127.0.0.1:8080/2

var server = app.listen(8080, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})