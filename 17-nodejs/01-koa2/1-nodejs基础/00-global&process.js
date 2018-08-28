/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-15 19:59:59 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-15 20:10:39
 */
/**
 * global
 */
if (typeof (window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}

/**
 * process
 */
// Node.js进程本身的事件由process对象来处理
console.log(process === global.process); // true
console.log(process.version); // v8.9.3
console.log(process.platform); // darwin
console.log(process.arch); // x64
console.log(process.cwd()); //返回当前工作目录
// process.chdir('/private/tmp'); // 切换当前工作目录

// process.nextTick()将在下一轮事件循环中调用
process.nextTick(function () {
    console.log('nextTick callback!');
});
console.log('nextTick was set!');
// nextTick was set!
// nextTick callback!

// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});