/**
 * @Author    csxiaoyao
 * @DateTime  2017-06-20
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 */

// 【普通阻塞方式】
// sunshine studio
// 程序执行结束!
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!"); 

// 【回调函数方式】
// 程序执行结束!
// sunshine studio
var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
	if (err) {
		console.log(err.stack);
		return;
	}
	console.log(data.toString());
});
console.log("程序执行结束!");