/*
* @Author: csxiaoyao
* @Date:   2017-08-24 21:19:43
* @Last Modified by:   csxiaoyao
* @Last Modified time: 2017-08-25 15:59:31
*/

// 【 协议 】
//  0                   1                   2                   3
//  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
// +-+-+-+-+-------+-+-------------+-------------------------------+
// |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
// |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
// |N|V|V|V|       |S|             |   (if payload len==126/127)   |
// | |1|2|3|       |K|             |                               |
// +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
// |     Extended payload length continued, if payload len == 127  |
// + - - - - - - - - - - - - - - - +-------------------------------+
// |                               |Masking-key, if MASK set to 1  |
// +-------------------------------+-------------------------------+
// | Masking-key (continued)       |          Payload Data         |
// +-------------------------------- - - - - - - - - - - - - - - - +
// :                     Payload Data continued ...                :
// + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
// |                     Payload Data continued ...                |
// +---------------------------------------------------------------+
// 
// FIN      1bit 表示信息的最后一帧，flag，也就是标记符
// RSV 1-3  1bit each 以后备用的 默认都为 0
// Opcode   4bit 帧类型，见下表
// Mask     1bit 掩码，是否加密数据，默认必须置为1 
// Payload  7bit 数据的长度
// Masking-key      1 or 4 bit 掩码
// Payload data     (x + y) bytes 数据
// Extension data   x bytes  扩展数据
// Application data y bytes  程序数据

// -+--------+-------------------------------------+-----------|
//  |Opcode  | Meaning                             | Reference |
// -+--------+-------------------------------------+-----------|
//  | 0      | Continuation Frame                  | RFC 6455  |
// -+--------+-------------------------------------+-----------|
//  | 1      | Text Frame                          | RFC 6455  |
// -+--------+-------------------------------------+-----------|
//  | 2      | Binary Frame                        | RFC 6455  |
// -+--------+-------------------------------------+-----------|
//  | 8      | Connection Close Frame              | RFC 6455  |
// -+--------+-------------------------------------+-----------|
//  | 9      | Ping Frame                          | RFC 6455  |
// -+--------+-------------------------------------+-----------|
//  | 10     | Pong Frame                          | RFC 6455  |
// -+--------+-------------------------------------+-----------|
// 
// 【 握手连接 】
// +--------+    1.发送Sec-WebSocket-Key        +---------+
// |        | --------------------------------> |        |
// |        |    2.加密返回Sec-WebSocket-Accept  |        |
// | client | <-------------------------------- | server |
// |        |    3.本地校验                      |        |
// |        | --------------------------------> |        |
// +--------+                                   +--------+
// 【 1. client => server 】
/*
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
 */
// 客户端发了一串 Base64 加密的密钥 Sec-WebSocket-Key
// 【 2. server => client 】
/*
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
 */
// Server 返回了 Sec-WebSocket-Accept 这个应答，这个应答内容是通过一定的方式生成的。生成算法是：
// mask  = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";  // 这是算法中要用到的固定字符串
// 【 accept = base64( sha1( key + mask ) ); 】
// 分解动作：
// 1. t = "GhlIHNhbXBsZSBub25jZQ==" + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
//    -> "GhlIHNhbXBsZSBub25jZQ==258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
// 2. s = sha1(t) 
//    -> 0xb3 0x7a 0x4f 0x2c 0xc0 0x62 0x4f 0x16 0x90 0xf6 
//       0x46 0x06 0xcf 0x38 0x59 0x45 0xb2 0xbe 0xc4 0xea
// 3. base64(s) 
//    -> "s3pPLMBiTxaQ9kYGzzhZRbK+xOo="
// 上面 Server 端返回的 HTTP 状态码是 101，如果不是 101 ，就说明握手一开始就失败了


//服务器程序
var crypto = require('crypto');
var WS = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'; // 算法中要用到的固定字符串

require('net').createServer(function(o) {
    var key;
    o.on('data', function(e) {
        //握手
        if (!key) {
            key = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
            // 算法：accept = base64( sha1( key + mask ) );
            key = crypto.createHash('sha1').update(key + WS).digest('base64');
            o.write('HTTP/1.1 101 Switching Protocols\r\n');
            o.write('Upgrade: websocket\r\n');
            o.write('Connection: Upgrade\r\n');
            o.write('Sec-WebSocket-Accept: ' + key + '\r\n');
            o.write('\r\n');

            // 握手成功后给客户端发送数据
            // 【不分片】ping包
            // o.write(encodeDataFrame({FIN:1,Opcode:9,PayloadData:"数据"}));
            // 【分片】数据包
            o.write(encodeDataFrame({ FIN: 0, Opcode: 1, PayloadData: "CS逍遥剑仙" }));
            o.write(encodeDataFrame({ FIN: 0, Opcode: 0, PayloadData: " SUNSHINE-" }));
            o.write(encodeDataFrame({ FIN: 1, Opcode: 0, PayloadData: "STUDIO" }));
            console.log("connect");
        }
        // 接收数据
        else {
            var data = decodeDataFrame(e);

            // 选择性断开连接：客户端 ws.close() 或返回数据为 close
            if (data.Opcode == 8 || data.PayloadData == "close") {
                // 可以发送结束包给客户端的onclose中带参数
                // var buf = new Buffer('\0\0客户端断开连接');
                // buf.writeUInt16BE(1000, 0);
                // o.write(encodeDataFrame({ FIN: 1, Opcode: 8, PayloadData: buf }));
                //断开连接
                o.end();
                console.log("disconnect");
            }

            //解析客户端传过来的数据帧并输出
            else {
                data.PayloadData = data.PayloadData.toString();
                o.write(encodeDataFrame({ FIN: 1, Opcode: 1, PayloadData: "服务端收到数据：" + data.PayloadData }));
                console.log("data from client:" + data.PayloadData);
            }
        };
    });
}).listen(8000);

/**
 * decodeDataFrame 解析客户端传来的二进制数据
 * 
 * 得到的数据格式：
 * {
 *     FIN: 1,
 *     Opcode: 1,
 *     Mask: 1,
 *     PayloadLength: 4,
 *     MaskingKey: [ 159, 18, 207, 93 ],
 *     PayLoadData: '握手成功'
 * }
 */
function decodeDataFrame(e){
  var i=0,j,s,frame={
    //解析前两个字节的基本数据
    FIN:e[i]>>7,Opcode:e[i++]&15,Mask:e[i]>>7,
    PayloadLength:e[i++]&0x7F
  };
  //处理特殊长度126和127
  if(frame.PayloadLength==126)
    frame.length=(e[i++]<<8)+e[i++];
  if(frame.PayloadLength==127)
    i+=4, //长度一般用四字节的整型，前四个字节通常为长整形留空的
    frame.length=(e[i++]<<24)+(e[i++]<<16)+(e[i++]<<8)+e[i++];
  //判断是否使用掩码
  if(frame.Mask){
    //获取掩码实体
    frame.MaskingKey=[e[i++],e[i++],e[i++],e[i++]];
    //对数据和掩码做异或运算
    for(j=0,s=[];j<frame.PayloadLength;j++)
      s.push(e[i+j]^frame.MaskingKey[j%4]);
  }else s=e.slice(i,frame.PayloadLength); //否则直接使用数据
  //数组转换成缓冲区来使用
  s=new Buffer(s);
  //如果有必要则把缓冲区转换成字符串来使用
  if(frame.Opcode==1)s=s.toString();
  //设置上数据部分
  frame.PayloadData=s;
  //返回数据帧
  return frame;
}

/**
 * encodeDataFrame 封装发送服务端数据
 * 
 * 【 不分片 】
 * o.write(encodeDataFrame({FIN:1,Opcode:9,PayloadData:"数据"}));
 * 【 分片 】
 * 开始帧：FIN=0,Opcode>0;一个
 * 传输帧：FIN=0,Opcode=0;零个或多个
 * 终止帧：FIN=1,Opcode=0;一个
 * 
 * FIN是FINAL的缩写，它为1时表示一个数据传输结束
 * 
 * o.write(encodeDataFrame({
 *   FIN:0,Opcode:1,PayloadData:"ABC"
 * }));
 * o.write(encodeDataFrame({
 *   FIN:0,Opcode:0,PayloadData:"-DEF-"
 * }));
 * o.write(encodeDataFrame({
 *   FIN:1,Opcode:0,PayloadData:"GHI"
 * }));
 */
function encodeDataFrame(e){
  var s=[],o=new Buffer(e.PayloadData),l=o.length;
  //输入第一个字节
  s.push((e.FIN<<7)+e.Opcode);
  //输入第二个字节，判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if(l<126)s.push(l);
  else if(l<0x10000)s.push(126,(l&0xFF00)>>2,l&0xFF);
  else s.push(
    127, 0,0,0,0, //8字节数据，前4字节一般没用留空
    (l&0xFF000000)>>6,(l&0xFF0000)>>4,(l&0xFF00)>>2,l&0xFF
  );
  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([new Buffer(s),o]);
}