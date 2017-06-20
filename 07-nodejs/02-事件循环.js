/**
 * @Author    csxiaoyao
 * @DateTime  2017-06-20
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 */

/*
Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高
Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现
Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

【EventEmitter 类】
 events.EventEmitter 处理事件触发与事件监听

【EventEmitter 方法】
---addListener(event, listener)
	为指定事件添加一个监听器到监听器数组的尾部
---on(event, listener)
	为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数
---once(event, listener)
	为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器
		server.once('connection', function (stream) {
		  console.log('Ah, we have our first user!');
		});
---removeListener(event, listener)
	移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器
	它接受两个参数，第一个是事件名称，第二个是回调函数名称
		var callback = function(stream) {
		  console.log('someone connected!');
		};
		server.on('connection', callback);
		// ...
		server.removeListener('connection', callback);
---removeAllListeners([event])
	移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器
---setMaxListeners(n)
	默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量
---listeners(event)
	返回指定事件的监听器数组
---emit(event, [arg1], [arg2], [...])
	按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false

【EventEmitter 类方法】
---listenerCount(emitter, event)
	返回指定事件的监听器数量

【EventEmitter 事件】
---newListener
	event - 字符串，事件名称
	listener - 处理事件函数
	该事件在添加新监听器时被触发
---removeListener
	event - 字符串，事件名称
	listener - 处理事件函数
	从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引
 */

// 【case1】:多个事件
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序
var connectHandler = function connected() {
	console.log('连接成功');
	// 触发 data_received 事件 
	eventEmitter.emit('data_received');
}
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功');
});
// 触发 connection 事件 
eventEmitter.emit('connection');
console.log("程序执行完毕");
// 【执行结果】
// 连接成功
// 数据接收成功
// 程序执行完毕


//【case2】：绑定多个回调函数
//EventEmitter 支持若干个事件监听器。当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
// 【执行结果】
// listener1 arg1 参数 arg2 参数
// listener2 arg1 参数 arg2 参数


//【case3】：绑定多个回调函数
var events = require('events');
var eventEmitter = new events.EventEmitter();
// 监听器 #1
var listener1 = function listener1() {
	console.log('监听器 listener1 执行');
}
// 监听器 #2
var listener2 = function listener2() {
	console.log('监听器 listener2 执行');
}
// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);
// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件");
// 处理 connection 事件 
eventEmitter.emit('connection');
// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听");
// 触发连接事件
eventEmitter.emit('connection');
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件");
console.log("程序执行完毕。");
// 【执行结果】
// 2 个监听器监听连接事件
// 监听器 listener1 执行
// 监听器 listener2 执行
// listener1 不再受监听
// 监听器 listener2 执行
// 1 个监听器监听连接事件
// 程序执行完毕