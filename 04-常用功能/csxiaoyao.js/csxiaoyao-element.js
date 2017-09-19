/*
* @Author: SUNSHINE
* @Date:   2017-03-23 00:05:42
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-23 10:57:36
*/
(function(csxiaoyao){
	csxiaoyao.show = function(ele){
	    ele.style.display = "block";
	}
	csxiaoyao.hide = function(ele){
        ele.style.display = "none";
    }
	/**
	 * 获取元素样式兼容写法
	 */
	csxiaoyao.getStyle = function(ele,attr){
	    if(window.getComputedStyle){
	        return window.getComputedStyle(ele,null)[attr];
	    }
	    return ele.currentStyle[attr];
	}
	/**
	 * 获取元素在整个页面的位置
	 */
	csxiaoyao.elementSite = function (ele) {
        var x = ele.offsetLeft;
        var y = ele.offsetTop;
        return {x:x,y:y};
    }
})(csxiaoyao);