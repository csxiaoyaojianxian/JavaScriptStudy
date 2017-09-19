/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 16:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-22 20:58:20
*/
(function(csxiaoyao){
	//设置cookie
	csxiaoyao.setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		exdays = exdays===undefined?exdays=7:exdays;
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		document.cookie = cname + "=" + cvalue + "; " + "expires="+d.toUTCString();
		return this; // 链式调用
	}
	//获取cookie
	csxiaoyao.getCookie = function(name) {
		var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){return (arr[2]);}
		else{return null;}
	}
	//清除cookie
	csxiaoyao.clearCookie = function(name) {  
		this.setCookie(name, "", -1);
		return this; // 链式调用
	}
	//集成方法
	csxiaoyao.cookie = function(cname, cvalue, exdays){
		if(arguments.length === 1){
			return this.getCookie(cname);
		}else if(arguments.length === 3 || arguments.length === 2){
			return this.setCookie(cname, cvalue, exdays);
		}else{
			return this;
		}
	}
})(csxiaoyao);