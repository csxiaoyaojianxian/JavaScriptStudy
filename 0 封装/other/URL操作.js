//js获取当前域名，获取的域名赋给 a 标签的 href 时，需要加上 http://
var domain = document.domain;
var domain = window.location.host;
document.write(domain);

//获取当前Url，取决于地址栏显示内容
var url = window.location.href;
var url = self.location.href;
var url = document.URL;
var url = document.location;
document.write(url);

//获取当前相对路径，http//www.csxiaoyao.com/blog/index.php?id=1，结果为：/blog/index.php
function GetUrlRelativePath()
{
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);
    //去除参数部分
    if(relUrl.indexOf("?") != -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
document.write(GetUrlRelativePath());