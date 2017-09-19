/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-23 10:55:18
*/
(function(csxiaoyao){
	csxiaoyao.key = function(event){ 
		var e = event ? event :(window.event ? window.event : null); 
		return e.keyCode;
	}
	csxiaoyao.mouse = function(event){ 
		var e = event ? event :(window.event ? window.event : null); 
		return e.button;
	}
	/**
	 * 获取鼠标位置
	 */
    csxiaoyao.mouseSite = function (event) {
        event = event || window.event;
        return {x:event.clientX,y:event.clientY};
    }
    csxiaoyao.mousePageSite = function (event) {
        event = event || window.event;
        //获取鼠标在整个页面的位置
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;
        return {x:pagex,y:pagey};
    }
})(csxiaoyao);