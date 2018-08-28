'use strict';
// 标准输入流（stdin）
// 标准输出流（stdout）
// 所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable

var fs = require('fs');

/** 
 * 输入流
 */
// 打开一个流
var rs = fs.createReadStream('testFile/sample.txt', 'utf-8');
rs.on('data', function (chunk) {
    // data事件可能会有多次，每次传递的chunk是流的一部分数据
    console.log('DATA:');
    console.log(chunk);
});
rs.on('end', function () {
    console.log('END');
});
rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

/** 
 * 输出流
 */
var ws1 = fs.createWriteStream('testFile/outputStream1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END....');
ws1.end();

var ws2 = fs.createWriteStream('testFile/outputStream2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END....', 'utf-8'));
ws2.end();

/** 
 * pipe
 */
// Readable流的pipe()方法把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里
var rs2 = fs.createReadStream('testFile/sample.txt');
var ws3 = fs.createWriteStream('testFile/copied.txt');
rs2.pipe(ws3);
// 默认当Readable流数据读取完毕，end事件触发后，自动关闭Writable流。如果不希望自动关闭Writable流，需要传入参数
// rs.pipe(ws, { end: false });