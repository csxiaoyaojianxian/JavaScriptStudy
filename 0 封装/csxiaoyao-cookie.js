/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 16:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-08 17:11:32
*/
var Cookie = function(){
	//设置cookie
	var setCookie = function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    document.cookie = cname + "=" + cvalue + "; " + "expires="+d.toUTCString();
	}
	//获取cookie
	var getCookie = function(name)
	{
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg)){return (arr[2]);}
	    else{return null;}
	}
	//清除cookie  
	var clearCookie = function(name) {  
	    setCookie(name, "", -1);  
	}
	return {
		setCookie:function(cname, cvalue, exdays){
            setCookie(cname, cvalue, exdays);
        },
        getCookie:function(name){
            return getCookie(name);
        },
        clearCookie:function(name){
            clearCookie(name);
        }
	}
}