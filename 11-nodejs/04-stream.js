/**
 * @Author    csxiaoyao
 * @DateTime  2017-06-20
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 */

/**
 * Node.js Stream(流)
 */
// Stream 是一个抽象接口，Node 中有很多对象实现了这个接口
// 例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）

// 【四种流类型】
// Readable - 可读操作
// Writable - 可写操作
// Duplex - 可读可写操作
// Transform - 操作被写入数据，然后读出结果

// 【常用事件】
// 所有的 Stream 对象都是 EventEmitter 的实例，常用事件：
// data - 当有数据可读时触发
// end - 没有更多的数据可读时触发
// error - 在接收和写入过程中发生错误时触发
// finish - 所有数据已被写入到底层系统时触发

// 【1 从流中读取数据】
var fs = require("fs");
var data = '';
var readerStream = fs.createReadStream('input.txt'); //创建可读流
readerStream.setEncoding('UTF8'); //设置编码为 utf8
// 处理流事件 --> data, end, error
readerStream.on('data', function(chunk) {
	data += chunk;
});
readerStream.on('end',function(){
	console.log(data);
});
readerStream.on('error', function(err){
	console.log(err.stack);
});
console.log("程序执行完毕");
// 程序执行完毕
// sunshine studio --CS逍遥剑仙

// 【2 写入流】
var fs2 = require("fs");
var data2 = 'www.csxiaoyo.com --CS逍遥剑仙';
var writerStream2 = fs2.createWriteStream('output.txt'); // 创建一个可以写入的流，写入到文件 output.txt 中
writerStream2.write(data,'UTF8'); // 使用 utf8 编码写入数据
writerStream2.end(); // 标记文件末尾
// 处理流事件 --> finish, error
writerStream2.on('finish', function() {
	console.log("写入完成");
});
writerStream2.on('error', function(err){
	console.log(err.stack);
});
console.log("程序执行完毕");
// 程序执行完毕
// 写入完成

// 【3 管道流】
// 管道提供了一个输出流到输入流的机制
var fs3 = require("fs");
// 创建一个可读流
var readerStream3 = fs3.createReadStream('input.txt');
// 创建一个可写流
var writerStream3 = fs3.createWriteStream('output.txt');
// 管道读写操作，读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream3.pipe(writerStream3);
console.log("程序执行完毕");

// 【4 链式流】
// 链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制，链式流一般用于管道操作
// 用管道和链式流压缩和解压文件
var fs4 = require("fs");
var zlib = require('zlib');
// 压缩 input.txt 文件为 input.txt.gz
fs4.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs4.createWriteStream('input.txt.gz'));
console.log("文件压缩完成");
// 解压 input.txt.gz 文件为 input.txt
var fs5 = require("fs");
var zlib2 = require('zlib');
fs5.createReadStream('input.txt.gz')
  .pipe(zlib2.createGunzip())
  .pipe(fs5.createWriteStream('input.txt'));
console.log("文件解压完成");