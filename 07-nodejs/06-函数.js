// 【函数作为参数】
function say(word) {
	console.log(word);
}
function execute(someFunction, value) {
	someFunction(value);
}
execute(say, "Hello");

// 【匿名函数】
function execute2(someFunction, value) {
	someFunction(value);
}
execute2(function(word){ console.log(word) }, "Hello");

// 【以 http 为例】
// var http = require("http");
// function onRequest(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }
// http.createServer(onRequest).listen(8888);
var http = require("http");
http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}).listen(8888);