var crypto=require('crypto');
var fs=require('fs');
var WS='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

var pool=[]; //连接池

require('net').createServer(function(o){
  var key;
  o.on('data',function(e){
    if(!key){
      var data=e.toString();
      //Flash握手
      if(data=='<policy-file-request/>\0')
        return fs.readFile('policy.txt',function(err,data){
          o.write(data+'\0');
        });
      //WebSocket握手
      if(key=data.match(/Sec-WebSocket-Key: (.+)|$/)[1])
        key=crypto.createHash('sha1').update(key+WS).digest('base64'),
        o.write([
          'HTTP/1.1 101 Switching Protocols',
          'Upgrade: websocket',
          'Connection: Upgrade',
          'Sec-WebSocket-Accept: '+key
        ].join('\r\n')+'\r\n\r\n');
    }else{
      //解析数据
      var frame=decodeDataFrame(e);
      //文本帧
      if(frame.Opcode==1){
        //转义数据
        var content=frame.PayloadData.replace(/\W/g,function(e){
          e=e.charCodeAt(0).toString(16);
          if(e.length==3)e='0'+e;
          return '\\'+(e.length>2?'u':'x')+e;
        }),client=o.remoteAddress+":"+o.remotePort,buffer;
        //包装成JSON格式，并做成一个数据帧
        buffer=encodeDataFrame({
          FIN:1,Opcode:1,
          PayloadData:'{"client":"'+client+'","content":"'+content+'"}'
        });
        //对所有连接广播数据
        for(i=0;i<pool.length;i++)pool[i].write(buffer);
      };
    };
  });
  //断开时从连接池中移除
  o.on("close",function(){
    for(i=0;i<pool.length;i++)if(pool[i]==o)pool.splice(i,1);
  });
  //捕获错误
  o.on("error",function(){});
  //放入连接池中
  pool.push(o);
}).listen(8000);

/*
下面两个函数的说明见
http://www.web-tinker.com/article/20307.html
http://www.web-tinker.com/article/20306.html
这两篇文章
*/
function encodeDataFrame(e){
  var s=[],o=new Buffer(e.PayloadData),l=o.length;
  //输入第一个字节
  s.push((e.FIN<<7)+e.Opcode);
  //输入第二个字节，判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if(l<126)s.push(l);
  else if(l<0x10000)s.push(126,(l&0xFF00)>>8,l&0xFF);
  else s.push(
    127, 0,0,0,0, //8字节数据，前4字节一般没用留空
    (l&0xFF000000)>>24,(l&0xFF0000)>>16,(l&0xFF00)>>8,l&0xFF
  );
  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([new Buffer(s),o]);
};
function decodeDataFrame(e){
  var i=0,j,s,frame={
    //解析前两个字节的基本数据
    FIN:e[i]>>7,Opcode:e[i++]&15,Mask:e[i]>>7,
    PayloadLength:e[i++]&0x7F
  };
  //处理特殊长度126和127
  if(frame.PayloadLength==126)
    frame.PayloadLength=(e[i++]<<8)+e[i++];
  if(frame.PayloadLength==127)
    i+=4, //长度一般用四字节的整型，前四个字节通常为长整形留空的
    frame.PayloadLength=(e[i++]<<24)+(e[i++]<<16)+(e[i++]<<8)+e[i++];
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
};