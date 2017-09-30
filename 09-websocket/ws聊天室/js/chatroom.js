
if(typeof(WebSocket)=='undefined'){
	alert('你的浏览器不支持 WebSocket ，推荐使用Google Chrome 或者 Mozilla Firefox');	
}

(function(){
	var key='all',mkey;
	var users={};
	var url='ws://127.0.0.1:8000';
	var so=false,n=false;
	var lus=A.$('us'),lct=A.$('ct');
	function st(){
		n=prompt('请给自己取一个响亮的名字：');
		n=n.substr(0,16);
		if(!n){
			return ;	
		}
		so=new WebSocket(url);
		so.onopen=function(){
			if(so.readyState==1){
				so.send('type=add&ming='+n);
			}
		}
		
		so.onclose=function(){
			so=false;
			lct.appendChild(A.$$('<p class="c2">退出聊天室</p>'));
		}
		
		so.onmessage=function(msg){
			eval('var da='+msg.data);
			var obj=false,c=false;
			if(da.type=='add'){
				var obj=A.$$('<p>'+da.name+'</p>');
				lus.appendChild(obj);
				cuser(obj,da.code);
				obj=A.$$('<p><span>['+da.time+']</span>欢迎<a>'+da.name+'</a>加入</p>');
				c=da.code;
			}else if(da.type=='madd'){
				mkey=da.code;
				da.users.unshift({'code':'all','name':'大家'});
				for(var i=0;i<da.users.length;i++){
					var obj=A.$$('<p>'+da.users[i].name+'</p>');
					lus.appendChild(obj);
					if(mkey!=da.users[i].code){
						cuser(obj,da.users[i].code);
					}else{
						obj.className='my';
						document.title=da.users[i].name;
					}
				}
				obj=A.$$('<p><span>['+da.time+']</span>欢迎'+da.name+'加入</p>');
				users.all.className='ck';
			}
			
			if(obj==false){
				if(da.type=='rmove'){
					var obj=A.$$('<p class="c2"><span>['+da.time+']</span>'+users[da.nrong].innerHTML+'退出聊天室</p>');
					lct.appendChild(obj);
					users[da.nrong].del();
					delete users[da.nrong];
				}else{
					da.nrong=da.nrong.replace(/{\\(\d+)}/g,function(a,b){
						return '<img src="sk/'+b+'.gif">';
					}).replace(/^data\:image\/png;base64\,.{50,}$/i,function(a){
						return '<img src="'+a+'">';
					});
					//da.code 发信息人的code
					if(da.code1==mkey){
						obj=A.$$('<p class="c3"><span>['+da.time+']</span><a>'+users[da.code].innerHTML+'</a>对我说：'+da.nrong+'</p>');
						c=da.code;
					}else if(da.code==mkey){
						if(da.code1!='all')
						obj=A.$$('<p class="c3"><span>['+da.time+']</span>我对<a>'+users[da.code1].innerHTML+'</a>说：'+da.nrong+'</p>');
						else
						obj=A.$$('<p><span>['+da.time+']</span>我对<a>'+users[da.code1].innerHTML+'</a>说：'+da.nrong+'</p>');
						c=da.code1;
					}else if(da.code==false){
						obj=A.$$('<p><span>['+da.time+']</span>'+da.nrong+'</p>');
					}else if(da.code1){
						obj=A.$$('<p><span>['+da.time+']</span><a>'+users[da.code].innerHTML+'</a>对'+users[da.code1].innerHTML+'说：'+da.nrong+'</p>');
						c=da.code;
					}
				}
			}
			if(c){
					obj.children[1].onclick=function(){
						users[c].onclick();
					}
				}
			lct.appendChild(obj);
			lct.scrollTop=Math.max(0,lct.scrollHeight-lct.offsetHeight);
		}
	}
	A.$('sd').onclick=function(){
		if(!so){
			 return st();
		}
		var da=A.$('nrong').value.trim();
		if(da==''){
			alert('内容不能为空');
			return false;	
		}
		A.$('nrong').value='';
		so.send('nr='+esc(da)+'&key='+key);
	}
	A.$('nrong').onkeydown=function(e){
		var e=e||event;
		if(e.keyCode==13){
			A.$('sd').onclick();
		}
	}
	function esc(da){
		da=da.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
		return encodeURIComponent(da);
	}
	function cuser(t,code){
		users[code]=t;
		t.onclick=function(){
			t.parentNode.children.rcss('ck','');
			t.rcss('','ck');
			key=code;
		}
	}
	A.$('ltian').style.height=(document.documentElement.clientHeight - 70)+'px';
	st();
	

	var bq=A.$('imgbq'),ems=A.$('ems');
	var l=80,r=4,c=5,s=0,p=Math.ceil(l/(r*c));
	var pt='sk/';
	bq.onclick=function(e){
		var e=e||event;
		if(!so){
			 return st();
		}
		ems.style.display='block';
		document.onclick=function(){
			gb();	
		}
		ct();
		try{e.stopPropagation();}catch(o){}
	}
	
	for(var i=0;i<p;i++){
		var a=A.$$('<a href="javascript:;">'+(i+1)+'</a>');
		ems.children[1].appendChild(a);
		ef(a,i);
	}
	ems.children[1].children[0].className='ck';
	
	function ct(){
		var wz=bq.weiz();
		with(ems.style){
			top=wz.y-242+'px';
			left=wz.x+bq.offsetWidth-235+'px';
		}
	}
		
	function ef(t,i){
		t.onclick=function(e){
			var e=e||event;
			s=i*r*c;
			ems.children[0].innerHTML='';
			hh();
			this.parentNode.children.rcss('ck','');
			this.rcss('','ck');
			try{e.stopPropagation();}catch(o){}
		}
	}
	
	function hh(){
		var z=Math.min(l,s+r*c);
		for(var i=s;i<z;i++){
			var a=A.$$('<img src="'+pt+i+'.gif">');
			hh1(a,i);
			ems.children[0].appendChild(a);
		}
		ct();
	}
	
	function hh1(t,i){
		t.onclick=function(e){
			var e=e||event;
			A.$('nrong').value+='{\\'+i+'}';
			if(!e.ctrlKey){
				gb();
			}
			try{e.stopPropagation();}catch(o){}
		}
	}
	
	function gb(){
		ems.style.display='';
		A.$('nrong').focus();
		document.onclick='';
	}
	hh();
	A.on(window,'resize',function(){
		A.$('ltian').style.height=(document.documentElement.clientHeight - 70)+'px';
		ct();
	})	

	var fimg=A.$('upimg');
	var img=new Image();
	var dw=400,dh=300;
	A.on(fimg,'change',function(ev){
		if(!so){
			st();
			return false;
		}
		if(key=='all'){
			alert('由于资源限制 发图只能私聊');
			return false;	
		}
		var f=ev.target.files[0];
		if(f.type.match('image.*')){
			var r = new FileReader();
			r.onload = function(e){
				img.setAttribute('src',e.target.result);
		    };
			r.readAsDataURL(f);
		}
	});
	img.onload=function(){
		ih=img.height,iw=img.width;
		if(iw/ih > dw/dh && iw > dw){
			ih=ih/iw*dw;
			iw=dw;
		}else if(ih > dh){
			iw=iw/ih*dh;
			ih=dh;
		}
		var rc = A.$$('canvas');
		var ct = rc.getContext('2d');
		rc.width=iw;
		rc.height=ih;
		ct.drawImage(img,0,0,iw,ih);
		var da=rc.toDataURL();
		so.send('nr='+esc(da)+'&key='+key);
	}
	
})();