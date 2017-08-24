var _w=window,_d=document;
String.prototype.trim=function(){return this.replace(/(^\s+)|(\s+$)/g,'')};
HTMLElement.prototype.rcss=function(a,b){
	if(a==''){
		eval('var s = new RegExp(/\\b'+b+'\\b/)');
		if(!s.test(this.className)){
			this.className=this.className.trim()+' '+b;
		}
	}else{
		eval('var s=this.className.replace(/\\b'+a+'\\b/g,b)');
		this.className=s.trim();
	}
	return this;
}
HTMLElement.prototype.del=function(){
	this.parentNode.removeChild(this);	
}
Array.prototype.each=HTMLCollection.prototype.each=NodeList.prototype.each=function(f){
	for(var i=0,l=this.length;i<l;i++){
		f(this[i],i,this);
	}
	return this;
}
HTMLCollection.prototype.rcss=NodeList.prototype.rcss=function(a,b){
	this.each(function(t){t.rcss(a,b);});
	return this;
}
NodeList.prototype.del=function(){
	this.each(function(t){t.del();});
}
HTMLElement.prototype.prev=function(){
	return this.previousElementSibling||this.previousSibling;
}
HTMLElement.prototype.next=function(){
	return this.nextElementSibling||this.nextSibling;
}
HTMLElement.prototype.weiz=function(){
		var y=this.offsetTop,x=this.offsetLeft,e=this.offsetParent;
		while(e){
			y+=e.offsetTop;
			x+=e.offsetLeft;
			e=e.offsetParent
		};
		return{
			'y':y,'x':x
		}
}
A={
	$:function(id){
		return _d.getElementById(id);
	},
	$$:function(a){
		if(a.indexOf('<')==-1){
			return _d.createElement(a);
		}
		else{
			var _1=_d.createElement('div');
			_1.innerHTML=a;
			return _1.children[0];
		}
	},
	r:function(n,m,f){
		if(f){
			return Math.random()*(m-n)+n
		}else{
			return Math.round(Math.random()*(m-n)+n);
		}
	},
	aj:function(url,data,f,gs){
		var self=this;
		var k=url.replace(/[^\w]/g,'');
		if(typeof(self.ajone[k])=='undefined'){
			self.ajone[k]=true;
			if(_w.XMLHttpRequest){
				var xm=new XMLHttpRequest()
			}
			else{
				var M=['MSXML2.XMLHTTP','Microsoft.XMLHTTP','MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0'];
				for(n=0;n<M.length;n++){
					try{
						var xm=new ActiveXObject(M[n]);
						break
					}
					catch(e){}
				}
			};
			xm.open("post",url,true);
			xm.setRequestHeader("is_ajax","1");
			xm.onreadystatechange=function(){
				if(xm.readyState==4){
					if(xm.status==200){
						delete self.ajone[k];
						if(f){
							if(typeof(f)=='string')A.$(f).innerHTML=xm.responseText;
							else{
								if(gs&&gs=='json'){
									eval('var _j='+xm.responseText);
									eval(f(_j))
								}
								else eval(f(xm.responseText))
							}
						}
					}
				}
			};
			xm.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			xm.send(data)
		}
	},
	on:function(el,ev,fn){
		if(el.attachEvent){
			el.attachEvent("on"+ev,function(){
				fn.apply(el,arguments)
			})
		}
		else{
			el.addEventListener(ev,fn,false)
		}
	},
	fnr:function(f){
		var s=[];
		for(var i=0,l=f.length;i<l;i++){
			if(f[i].name&&f[i].name!=''){
				switch(f[i].tagName.toLowerCase()){
					case'select':for(var a=0;a<f[i].length;a++){
						if(f[i][a].selected){
							s.push(f[i].name+'='+encodeURIComponent(f[i][a].value))
						}
					};
					break;
					default:switch(f[i].type.toLowerCase()){
						case'radio':var fo=f[f[i].name];
						for(var a=0;a<fo.length;a++){
							if(fo[a].checked){
								s.push(fo[a].name+'='+encodeURIComponent(fo[a].value));
								break
							}
						};
						i+=(fo.length-1);
						break;
						case'checkbox':if(f[i].checked){
							s.push(f[i].name+'='+encodeURIComponent(f[i].value))
						};
						break;
						default:s.push(f[i].name+'='+encodeURIComponent(f[i].value));
						break
					}
				}
			}
		};
		return s.join('&')
	}
};
