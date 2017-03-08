/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-08 17:12:04
*/
function Url(){
    var url = window.location.href;
    var urlHandler = function(value){
        if(value){
            url = value;
        }
        return url;
    }
    // URL编码解码
    var encodeUrl = function(url){return encodeURIComponent(url);};
    var decodeUrl = function(url){return decodeURIComponent(url);};
    // 获取get参数,$_GET["csxiaoyao"]
    var $_GET = function(){
        var u = url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get = {};
            for(var i in u){
                var j = u[i].split("=");
                get[j[0]] = decodeUrl(j[1]);
            }
            return get;
        } else {
            return {};
        }
    };
    // 获取相对路径
    var getUrlRelativePath = function(){
        var arrUrl = url.split("//");
        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);
        //去除参数部分
        if(relUrl.indexOf("?") != -1){
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    };
    return {
        url:function(value){
            return urlHandler(value);
        },
        $_GET:$_GET(),
        get:function(param){
            return $_GET()[param];
        },
        getRelativePath:function(){
            return getUrlRelativePath();
        },
        encodeUrl:function(url){
            return encodeUrl(url);
        },
        decodeUrl:function(url){
            return decodeUrl(url);
        }
    }
}