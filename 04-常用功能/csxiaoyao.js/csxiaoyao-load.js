/*
* @Author: SUNSHINE
* @Date:   2017-03-29 17:09:54
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-29 17:15:54
*/

(function(csxiaoyao){
	csxiaoyao.ready = function(fn){  
		if(document.addEventListener){      
			//标准浏览器  
			document.addEventListener('DOMContentLoaded',function(){  
				//注销事件，避免反复触发  
				document.removeEventListener('DOMContentLoaded',arguments.callee,false); 
				//执行函数   
				fn();
			},false);  
		}else if(document.attachEvent){     
			//IE浏览器  
			document.attachEvent('onreadystatechange',function(){  
				if(document.readyState=='complete'){  
					document.detachEvent('onreadystatechange',arguments.callee);  
					//执行函数   
					fn();  
				}  
			});  
		}
		return this;
	}
})(csxiaoyao);