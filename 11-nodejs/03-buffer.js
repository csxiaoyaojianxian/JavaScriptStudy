/**
 * @Author    csxiaoyao
 * @DateTime  2017-06-20
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 */

/**
 * Node.js Buffer(缓冲区)
 */

// 处理I/O操作中移动的二进制数据时，可能使用 Buffer 库
// 原始数据存储在 Buffer 类的实例中，类似于一个整数数组，但对应于 V8 堆内存之外的一块原始内存

//【创建 Buffer 类】
// 方法 1
// 创建长度为 10 字节的 Buffer 实例：
var buf = new Buffer(10);
// 方法 2
// 通过给定的数组创建 Buffer 实例：
var buf = new Buffer([10, 20, 30, 40, 50]);
// 方法 3
// 通过一个字符串来创建 Buffer 实例：
// utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"
var buf = new Buffer("www.csxiaoyao.com", "utf-8");

//【写入缓冲区】
// buf.write(string[, offset[, length]][, encoding])
// string - 写入缓冲区的字符串
// offset - 缓冲区开始写入的索引值，默认为 0
// length - 写入的字节数，默认为 buffer.length
// encoding - 使用的编码。默认为 'utf8' 
// 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
buf = new Buffer(256);
len = buf.write("www.csxiaoyao.com");
console.log("写入字节数 : "+  len); // 写入字节数 : 14

//【从缓冲区读取数据】
// buf.toString([encoding[, start[, end]]])
// encoding - 使用的编码。默认为 'utf8' 
// start - 指定开始读取的索引位置，默认为 0
// end - 结束位置，默认为缓冲区的末尾
// 解码缓冲区数据并使用指定的编码返回字符串
buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
	buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

//【 Buffer ---> JSON 对象 】
// buf.toJSON()
var buf = new Buffer('www.runoob.com');
var json = buf.toJSON(buf);
console.log(json);// [ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ]

//【缓冲区合并】
// Buffer.concat(list[, totalLength])
// list - 用于合并的 Buffer 对象数组列表
// totalLength - 指定合并后Buffer对象的总长度
// 返回一个多个成员合并的新 Buffer 对象
var buffer1 = new Buffer('sunshine ');
var buffer2 = new Buffer('www.csxiaoyao.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());// buffer3 内容: sunshine www.runoob.com

//【缓冲区比较】
// buf.compare(otherBuffer);
// otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象
// 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);
if(result < 0) {
	console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
	console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
	console.log(buffer1 + " 在 " + buffer2 + "之后");
}
// ABC在ABCD之前

//【拷贝缓冲区】
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
// targetBuffer - 要拷贝的 Buffer 对象
// targetStart - 数字, 可选, 默认: 0
// sourceStart - 数字, 可选, 默认: 0
// sourceEnd - 数字, 可选, 默认: buffer.length
// 没有返回值
var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString()); // buffer2 content: ABC

//【缓冲区裁剪】
// buf.slice([start[, end]])
// start - 数字, 可选, 默认: 0
// end - 数字, 可选, 默认: buffer.length
// 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
var buffer1 = new Buffer('csxiaoyao');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
// buffer2 content: cs

//【缓冲区长度】
// buf.length;
// 返回 Buffer 对象所占据的内存长度
var buffer = new Buffer('www.csxiaoyao.com');
// 缓冲区长度
console.log("buffer length: " + buffer.length);
// buffer length: 14

//【API】
// 【1 创建】
// -- new Buffer(size)  分配一个新的 size 大小单位为8位字节的 buffer, size 必须小于 kMaxLength，否则，将会抛出异常 RangeError
// -- new Buffer(buffer)  拷贝参数 buffer 的数据到 Buffer 实例
// -- new Buffer(str[, encoding])  分配一个新的 buffer，其中包含传入的 str 字符串，encoding 编码方式默认为 'utf8'
// 【2 常用】
// -- buf.length  返回 buffer 对象所分配的内存数
// -- buf.toString([encoding[, start[, end]]])  解码，默认'utf8'，start默认0，end默认buffer.length
// -- buf.toJSON()  将 Buffer 实例转换为 JSON 对象
// -- buf[index]  获取或设置指定的字节，返回值代表一个字节，所以返回值的合法范围是十六进制0x00到0xFF，或者十进制0至255
// -- buf.equals(otherBuffer)  比较两个缓冲区是否相等，如果是返回 true，否则返回 false
// -- buf.compare(otherBuffer)  比较两个 Buffer 对象，返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同
// -- buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])  buffer 拷贝，源和目标可以相同
// -- buf.slice([start[, end]])  剪切 Buffer 对象，负的索引从 buffer 尾部开始计算
// 【3 读写】
// -- buf.write(string[, offset[, length]][, encoding])  根据参数 offset 偏移量和指定的 encoding 编码方式，将参数 string 数据写入buffer。 offset 偏移量默认值是 0, encoding 编码方式默认是 utf8。 length 长度是将要写入的字符串的 bytes 大小。 返回 number 类型，表示写入了多少 8 位字节流。如果 buffer 没有足够的空间来放整个 string，它将只会只写入部分字符串。 length 默认是 buffer.length - offset。 这个方法不会出现写入部分字符。
// -- buf.fill(value[, offset][, end])  使用指定的 value 来填充 buffer，如果没有指定 offset (默认是 0) 并且 end (默认是 buffer.length) ，将会填充整个buffer
// 【4 其他读写】
// -- buf.writeUIntLE(value, offset, byteLength[, noAssert])  将 value 写入 buffer，最高支持 48 位无符号整数，小端对齐，noAssert 默认 false，值为 true 时，不再验证 value 和 offset 的有效性
// -- buf.writeUIntBE(value, offset, byteLength[, noAssert])  最高支持48位无符号整数，大端对齐
// -- buf.writeIntLE(value, offset, byteLength[, noAssert])  最高支持48位有符号整数，小端对齐
// -- buf.writeIntBE(value, offset, byteLength[, noAssert])  最高支持48位有符号整数，大端对齐
var b = new Buffer(6);
b.writeUIntBE(0x1234567890ab, 0, 6);
console.log(b); // <Buffer 12 34 56 78 90 ab>
// -- buf.readUIntLE(offset, byteLength[, noAssert])  支持读取 48 位以下的无符号数字，小端对齐，noAssert 默认 false，值为 true 时，不再验证 value 和 offset 的有效性
// -- buf.readUIntBE(offset, byteLength[, noAssert])  支持读取 48 位以下的无符号数字，大端对齐
// -- buf.readIntLE(offset, byteLength[, noAssert])  支持读取 48 位以下的有符号数字，小端对齐
// -- buf.readIntBE(offset, byteLength[, noAssert])  支持读取 48 位以下的有符号数字，大端对齐
// -- buf.readUInt8(offset[, noAssert])  根据指定的偏移量，读取一个无符号 8 位整数，noAssert 默认 false，值为 true 时，不再验证 offset 的有效性
// -- buf.readUInt16LE(offset[, noAssert])  读取一个无符号 16 位整数
// -- buf.readUInt16BE(offset[, noAssert])  读取一个无符号 16 位整数，大端对齐
// -- buf.readUInt32LE(offset[, noAssert])  读取一个无符号 32 位整数，小端对齐
// -- buf.readUInt32BE(offset[, noAssert])  读取一个无符号 32 位整数，大端对齐
// -- buf.readInt8(offset[, noAssert])  根据指定的偏移量，读取一个有符号 8 位整数，noAssert 默认 false，值为 true 时，不再验证 offset 的有效性
// -- buf.readInt16LE(offset[, noAssert])  读取一个 有符号 16 位整数，小端对齐
// -- buf.readInt16BE(offset[, noAssert])  读取一个 有符号 16 位整数，大端对齐
// -- buf.readInt32LE(offset[, noAssert])  读取一个有符号 32 位整数，小端对齐
// -- buf.readInt32BE(offset[, noAssert])  读取一个有符号 32 位整数，大端对齐
// -- buf.readFloatLE(offset[, noAssert])  读取一个 32 位双浮点数，小端对齐
// -- buf.readFloatBE(offset[, noAssert])  读取一个 32 位双浮点数，大端对齐
// -- buf.readDoubleLE(offset[, noAssert])  读取一个 64 位双精度数，小端对齐
// -- buf.readDoubleBE(offset[, noAssert])  读取一个 64 位双精度数，大端对齐
// -- buf.writeUInt8(value, offset[, noAssert])  根据传入的 offset 偏移量将 value 写入 buffer，value 必须是一个合法的无符号 8 位整数，noAssert 默认 false，值为 true 时，不再验证 offset 的有效性
// -- buf.writeUInt16LE(value, offset[, noAssert])  value 是一个合法的无符号 16 位整数，小端对齐
// -- buf.writeUInt16BE(value, offset[, noAssert])  value 是一个合法的无符号 16 位整数，大端对齐
// -- buf.writeUInt32LE(value, offset[, noAssert])  value 是一个合法的无符号 32 位整数，小端对齐
// -- buf.writeUInt32BE(value, offset[, noAssert])  value 是一个合法的有符号 32 位整数
// -- buf.writeInt8(value, offset[, noAssert])
// -- buf.writeInt16LE(value, offset[, noAssert])  value 是一个合法的 signed 16 位整数
// -- buf.writeInt16BE(value, offset[, noAssert])  value 是一个合法的 signed 16 位整数
// -- buf.writeInt32LE(value, offset[, noAssert])  value 是一个合法的 signed 32 位整数
// -- buf.writeInt32BE(value, offset[, noAssert])  value 是一个合法的 signed 32 位整数
// -- buf.writeFloatLE(value, offset[, noAssert])  当 value 不是一个 32 位浮点数类型的值时，结果将是不确定的
// -- buf.writeFloatBE(value, offset[, noAssert])  当 value 不是一个 32 位浮点数类型的值时，结果将是不确定的
// -- buf.writeDoubleLE(value, offset[, noAssert])  value 是一个有效的 64 位double 类型的值
// -- buf.writeDoubleBE(value, offset[, noAssert])  value 是一个有效的 64 位double 类型的值