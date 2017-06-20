// exports 方式1
// 导出 exports 对象
exports.world = function() {
	console.log('Hello World');
}

// exports 方式2
// 导出目的对象（ 如 Hello ）
module.exports = function() {
    // ...
}
function Hello() {
	var name;
	this.setName = function(thyName) {
		name = thyName;
	};
	this.sayHello = function() {
		console.log('Hello ' + name);
	};
};
module.exports = Hello;