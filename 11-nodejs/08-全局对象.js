/**
 * 普通全局变量
 */
// 【 global            】 nodejs 中的 global 对应于浏览器的 window 对象
// 【__filename         】 输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。如果在模块中，返回的值是模块文件的路径
// 【__dirname          】 输出当前执行脚本所在的目录
// 【setTimeout(cb, ms) 】 全局函数在指定的毫秒(ms)数后执行指定函数(cb)，返回一个代表定时器的句柄值
// 【clearTimeout( t )  】 全局函数用于停止一个之前通过 setTimeout() 创建的定时器，参数 t 是通过 setTimeout() 函数创建的定时器
// 【setInterval(cb, ms)】 全局函数在指定的毫秒(ms)数后执行指定函数(cb)，返回一个代表定时器的句柄值
// 【clearInterval( t ) 】 全局函数用于停止一个之前通过 setInterval() 创建的定时器，参数 t 是通过 setInterval() 函数创建的定时器

console.log( __filename ); // /Users/sunshine/Workspace/JavaScriptStudy/07-nodejs/08-全局对象.js
console.log( __dirname ); // /Users/sunshine/Workspace/JavaScriptStudy/07-nodejs

function printHello(){
	console.log( "Hello, World!");
}
var t1 = setTimeout(printHello, 2000); // 两秒后执行以上函数
// clearTimeout(t1); // 清除定时器
var t2 = setInterval(printHello, 2000);
// clearInterval(t2); // 清除定时器

/**
 * 命令行全局变量
 */
// 【console】 用于提供控制台标准输出，由 Internet Explorer 的 JScript 引擎提供的调试工具，用于向标准输出流（stdout）或标准错误流（stderr）输出字符
// console.log([data][, ...])               向标准输出流打印字符并以换行符结束。该方法接收若干个参数，如果只有一个参数，则输出这个参数的字符串形式。如果有多个参数，则以类似于C语言 printf() 命令的格式输出
// console.info([data][, ...])              返回信息性消息(蓝色惊叹号)
// console.error([data][, ...])             输出错误消息(红叉)
// console.warn([data][, ...])              输出警告消息(黄色惊叹号)
// console.dir(obj[, options])              对一个对象进行检查(inspect)，并以易于阅读和打印的格式显示
// console.time(label)                      输出时间，表示计时开始
// console.timeEnd(label)                   结束时间，表示计时结束
// console.trace(message[, ...])            当前执行的代码在堆栈中的调用路径
// console.assert(value[, message][, ...])  用于判断某个表达式或变量是否为真，接受两个参数(表达式，字符串)，只有当第一个参数为false，才会输出第二个参数
console.info("程序开始执行：");
var counter = 10;
console.log("计数: %d", counter); // 计数: 10
console.trace();
console.time("获取数据");
// 执行一些代码
console.timeEnd("获取数据");

/**
 * 进程全局变量
 */
// 【process】 全局变量(global对象属性)，用于描述当前 Node.js 进程状态的对象，提供一个与操作系统的简单接口
// exit               当进程准备退出时触发
// beforeExit         当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行
// uncaughtException  当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生
// Signal 事件         当进程接收到信号时就触发，信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等

process.on('exit', function(code) {
	// 以下代码永远不会执行
	setTimeout(function() {
		console.log("该代码不会执行");
	}, 0);
	console.log('退出码为:', code);
});
console.log("程序执行结束");
// 程序执行结束
// 退出码为: 0

// 【退出状态码】
// 1	Uncaught Fatal Exception                     有未捕获异常，并且没有被域或 uncaughtException 处理函数处理
// 2	Unused                                       保留
// 3	Internal JavaScript Parse Error              JavaScript的源码启动 Node 进程时引起解析错误。非常罕见，仅会在开发 Node 时才会有
// 4	Internal JavaScript Evaluation Failure       JavaScript 的源码启动 Node 进程，评估时返回函数失败。非常罕见，仅会在开发 Node 时才会有
// 5	Fatal Error                                  V8 里致命的不可恢复的错误。通常会打印到 stderr ，内容为： FATAL ERROR
// 6	Non-function Internal Exception Handler      未捕获异常，内部异常处理函数不知为何设置为on-function，并且不能被调用
// 7	Internal Exception Handler Run-Time Failure  未捕获的异常， 并且异常处理函数处理时自己抛出了异常。例如，如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常
// 8	Unused                                       保留
// 9	Invalid Argument                             可能是给了未知的参数，或者给的参数没有值
// 10	Internal JavaScript Run-Time Failure         JavaScript的源码启动 Node 进程时抛出错误，非常罕见，仅会在开发 Node 时才会有
// 12	Invalid Debug Argument                       设置了参数--debug 和/或 --debug-brk，但是选择了错误端口
// 128	Signal Exits                                 如果 Node 接收到致命信号，比如SIGKILL 或 SIGHUP，那么退出代码就是128 加信号代码。这是标准的 Unix 做法，退出信号代码放在高位

// 【Process 属性】
// stdout     标准输出流
// stderr     标准错误流
// stdin      标准输入流
// argv       返回一个数组，由命令行执行脚本时的各个参数组成。第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数
// execPath   返回执行当前脚本的 Node 二进制文件的绝对路径
// execArgv   返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数
// env        返回一个对象，成员为当前 shell 的环境变量
// exitCode   进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码
// version    Node 的版本
// versions   包含 node 的版本和依赖
// config     一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象，它与运行 ./configure 脚本生成的 "config.gypi" 文件相同
// pid        当前进程的进程号
// title      进程名，默认值为"node"，可以自定义该值
// arch       当前 CPU 的架构：'arm'、'ia32' 或者 'x64'
// platform   运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
// mainModule require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块，可以认为，这两者引用了同一个模块

// 输出到终端
process.stdout.write("Hello World!" + "\n");
// 通过参数读取
process.argv.forEach(function(val, index, array) {
	console.log(index + ': ' + val);
});
// 获取执行路径
console.log(process.execPath);
// 平台信息
console.log(process.platform);
// Hello World!
// 0: /usr/local/bin/node
// 1: /Users/sunshine/Workspace/JavaScriptStudy/07-nodejs/08-全局对象.js
// /usr/local/bin/node
// darwin

// 【Process方法参考手册】
// abort()                        这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件
// chdir(directory)               改变当前工作进程的目录，如果操作失败抛出异常
// cwd()                          返回当前进程的工作目录
// exit([code])                   使用指定的 code 结束进程。如果忽略，将会使用 code 0
// getgid()                       获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// setgid(id)                     设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// getuid()                       获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// setuid(id)                     设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID 。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// getgroups()                    返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// setgroups(groups)              设置进程的群组 ID。这是授权操作，所有你需要有 root 权限，或者有 CAP_SETGID 能力。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// initgroups(user, extra_group)  读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所有你需要有 root 权限，或者有 CAP_SETGID 能力。注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// kill(pid[, signal])            发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。
// memoryUsage()                  返回一个对象，描述了 Node 进程所用的内存状况，单位为字节
// nextTick(callback)             一旦当前事件循环结束，调用回到函数
// umask([mask])                  设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码
// uptime()                       返回 Node 已经运行的秒数
// hrtime()                       返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔

// 输出当前目录
console.log('当前目录: ' + process.cwd());
// 输出内存使用情况
console.log(process.memoryUsage());
// 当前目录: /Users/sunshine/Workspace/JavaScriptStudy/07-nodejs
// { rss: 27209728,
//   heapTotal: 6807552,
//   heapUsed: 4294000,
//   external: 8252 }
