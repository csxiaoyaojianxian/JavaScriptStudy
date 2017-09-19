/*
* @Author: csxiaoyaojianxian
* @Date:   2017-02-16 18:30:52
* @Last Modified by:   SUNSHINE
* @Last Modified time: 2017-03-24 22:49:41
*/
(function(csxiaoyao){
    csxiaoyao.csxiaoyao_url = window.location.href;
    csxiaoyao.url = function(value){
        if(value){
            this.csxiaoyao_url = value;
            return this;// 链式调用
        }else{
            return this.csxiaoyao_url;
        }
    }
    // URL编码解码
    csxiaoyao.encodeUrl = function(url){return encodeURIComponent(url);};
    csxiaoyao.decodeUrl = function(url){return decodeURIComponent(url);};
    // 获取get参数
    csxiaoyao.getParam = function(){
        var u = this.csxiaoyao_url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get = {};
            for(var i in u){
                var j = u[i].split("=");
                get[j[0]] = this.decodeUrl(j[1]);
            }
            // 判断参数
            if(arguments.length === 0){
                return get;
            }else{
                return get[arguments[0]];
            }
        }else{
            return {};
        }

    };
    // 获取相对路径
    csxiaoyao.getUrlRelativePath = function(){
        var arrUrl = this.csxiaoyao_url.split("//");
        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);
        //去除参数部分
        if(relUrl.indexOf("?") != -1){
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    };
})(csxiaoyao);