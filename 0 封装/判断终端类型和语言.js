//判断语言
var language = (navigator.browserLanguage||navigator.language).toLowerCase();
document.write("<br/>语言版本：" + language);
//判断是否为移动端
function IsMobile() {
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
document.write("<br/>是否为移动端：" + IsMobile());