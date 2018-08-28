// 【 OS 模块 】
// 提供基本的系统操作函数

var os = require("os");

/**
 * OS 方法
 */
// os.tmpdir()             默认临时文件夹
// os.endianness()         CPU 字节序 "BE" 或 "LE"
// os.hostname()           主机名
// os.type()               系统名
// os.platform()           系统名
// os.arch()               CPU 架构 "x64"、"arm"、"ia32"
// os.release()            操作系统发行版本
// os.uptime()             系统运行时间(秒)
// os.loadavg()            返回一个包含 1、5、15 分钟平均负载的数组
// os.totalmem()           系统内存总量(字节)
// os.freemem()            操作系统空闲内存量(字节)
// os.cpus()               返回一个对象数组，包含所安装的每个CPU/内核信息：型号、速度(MHz)、时间(含user、nice、sys、idle、irq使用CPU/内核毫秒数的对象)
// os.networkInterfaces()  获得网络接口列表

/**
 * OS 属性
 */
// os.EOL                  定义操作系统行尾符的常量

// CPU 的字节序
console.log('endianness : ' + os.endianness());
// 操作系统名
console.log('type : ' + os.type());
// 操作系统名
console.log('platform : ' + os.platform());
// 系统内存总量
console.log('total memory : ' + os.totalmem() + " bytes.");
// 操作系统空闲内存量
console.log('free memory : ' + os.freemem() + " bytes.");

// endianness : LE
// type : Darwin
// platform : darwin
// total memory : 8589934592 bytes.
// free memory : 304828416 bytes.
