/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-08 17:21:26
*/
function UserAgent(){
    //判断语言
    var language = (navigator.browserLanguage||navigator.language).toLowerCase();
    //判断是否为移动端
    function isMobile() {
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
    return {
        language:language,
        isMobile:isMobile()
    }
}