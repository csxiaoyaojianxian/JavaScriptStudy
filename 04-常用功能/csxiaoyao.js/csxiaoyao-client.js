/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-23 11:36:48
*/
(function(csxiaoyao){
    //判断语言
    csxiaoyao.language = (navigator.browserLanguage||navigator.language).toLowerCase();
    //判断是否为移动端(新方法)
    csxiaoyao.isMobile = 'ontouchstart' in document;
    //判断是否为移动端(旧方法)
    function isMobileOld(){
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    csxiaoyao.isMobileOld = isMobileOld();
    //获取屏幕可视区域的宽高
    csxiaoyao.clientVisible = function(){
        if(window.innerHeight !== undefined){
            return {
                "width": window.innerWidth,
                "height": window.innerHeight
            }
        }else if(document.compatMode === "CSS1Compat"){
            return {
                "width": document.documentElement.clientWidth,
                "height": document.documentElement.clientHeight
            }
        }else{
            return {
                "width": document.body.clientWidth,
                "height": document.body.clientHeight
            }
        }
    }
    //获取屏幕分辨率
    csxiaoyao.client = function(){
        return {
            "width": window.screen.width,
            "height": window.screen.height
        }
    }
    //获取屏幕可用部分宽高
    csxiaoyao.clientAvail = function(){
        return {
            "width": window.screen.availWidth,
            "height": window.screen.availHeight 
        }
    }
})(csxiaoyao);