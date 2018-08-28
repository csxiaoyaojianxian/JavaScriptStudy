var WebSocket=WebSocket||function(url){
  var SRC="WebSocket.swf";
  var id=Math.random()*1E9|0,events={},s,i;
  //事件关联
  s=["open","message","close","error"];
  for(i=0;i<s.length;i++)(function(o,n){
    var s=events[n]=[];
    window[n+id]=function(e){
      if(typeof o["on"+n]=="function")o["on"+n](e);
      for(var i=0;i<s.length;i++)s[i](e);
    };
  })(this,s[i]);
  //绑定事件操作函数
  this.addEventListener=function(e,f){
    events[e].push(f);
  },this.removeEventListener=function(e,f){
    for(var i=0,s=events[e];i<s.length;i++)
      if(s[i]==f)s.splice(i,1),i=s.length;
  };
  //绑定AS接口方法
  this.send=function(e){
    window["WebSocket"+id].send(e);
  },this.close=function(){
    window["WebSocket"+id].close();
  };
  //解析构造参数，加载SWF
  var o=url.match(/\/\/([\w.]+)(?::(\d+))?(.*$)/);
  o=[
   "id="+id,"port="+(o[2]||80),
   "host="+o[1],"path="+(o[3]||"/")
  ].join("&");
  var data=[
    '<object width="0" height="0" ',
    'type="application/x-shockwave-flash" ',
    'id="WebSocket'+id+'" data="'+SRC+'">',
    '<param name="Movie" value="'+SRC+'" />',
    '<param name="FlashVars" value="'+o+'" />',
    '</object>'
  ].join("");
  document.body
    ?document.body.insertAdjacentHTML("beforeend",data)
    :document.write(data);
};