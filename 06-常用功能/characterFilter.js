/*
* @Author: csxiaoyao
* @Date:   2017-09-07 14:12:02
* @Last Modified by:   csxiaoyao
* @Last Modified time: 2017-09-09 14:12:02
*/


/*
url转向验证
描述：对通过javascript语句载入（或转向）的页面进行验证，防止转到第三方网页和跨站脚本攻击
返回值：true -- 合法；false -- 非法
例：
合法的值
    http://xxx.csxiaoyao.com/hi/redirect.html?url=http://www.csxiaoyao.com
    http://xxx.csxiaoyao.com/hi/redirect.html?url=a.html
    http://xxx.csxiaoyao.com/hi/redirect.html?url=/a/1.html
非法的值
    http://xxx.csxiaoyao.com/hi/redirect.html?url=http://www.baidu.com
    http://xxx.csxiaoyao.com/hi/redirect.html?url=javascript:codehere
    http://xxx.csxiaoyao.com/hi/redirect.html?url=//www.csxiaoyao.com
*/
function VaildURL(sUrl)
{
	return (/^(https?:\/\/)?[\w\-.]+\.(csxiaoyao|sunshinestudio)\.(com|cn)($|\/|\\)/i).test(sUrl)||(/^[\w][\w\/\.\-_%]+$/i).test(sUrl)||(/^[\/\\][^\/\\]/i).test(sUrl) ? true : false;
}

//html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
function HtmlEncode(sStr)
{
	sStr = sStr.replace(/&/g,"&amp;");
	sStr = sStr.replace(/>/g,"&gt;");
	sStr = sStr.replace(/</g,"&lt;");
	sStr = sStr.replace(/"/g,"&quot;");
	sStr = sStr.replace(/'/g,"&#39;");
	return sStr;
}

//html正文解码：对HtmlEncode函数的结果进行解码
function HtmlUnEncode(sStr)
{
	sStr = sStr.replace(/&amp;/g,"&");
	sStr = sStr.replace(/&gt;/g,">");
	sStr = sStr.replace(/&lt;/g,"<");
	sStr = sStr.replace(/&quot;/g,'"');
	sStr = sStr.replace(/&#39;/g,"'");
	return sStr;
}

/*
html属性编码：对需要出现在HTML属性里的不信任输入进行编码
注意:
(1)该函数不适用于属性为一个URL地址的编码.这些标记包括:a/img/frame/iframe/script/xml/embed/object...
属性包括:href/src/lowsrc/dynsrc/background/...
(2)该函数不适用于属性名为 style="[Un-trusted input]" 的编码
*/
function HtmlAttributeEncode(sStr)
{
	sStr = sStr.replace(/&/g,"&amp;");
	sStr = sStr.replace(/>/g,"&gt;");
	sStr = sStr.replace(/</g,"&lt;");
	sStr = sStr.replace(/"/g,"&quot;");
	sStr = sStr.replace(/'/g,"&#39;");
	sStr = sStr.replace(/=/g,"&#61;");
	sStr = sStr.replace(/`/g,"&#96;");
	return sStr;
}


/*
对需要出现在一个URI的一部分的不信任输入进行编码 
例如:
<a href="http://search.msn.com/results.aspx?q1=[Un-trusted-input]& q2=[Un-trusted-input]">Click Here!</a>
以下字符将会被编码: 
除[a-zA-Z0-9.-_]以外的字符都会被替换成URL编码
*/
function UriComponentEncode(sStr)
{
	sStr = encodeURIComponent(sStr);
	sStr = sStr.replace(/~/g,"%7E");
	sStr = sStr.replace(/!/g,"%21");
	sStr = sStr.replace(/\*/g,"%2A");
	sStr = sStr.replace(/\(/g,"%28");
	sStr = sStr.replace(/\)/g,"%29");
	sStr = sStr.replace(/'/g,"%27");
	sStr = sStr.replace(/\?/g,"%3F");
	sStr = sStr.replace(/;/g,"%3B");
	return sStr;
}


//用做过滤HTML标签里面的 比如这个例子里的<input value="XXXX">  XXXX就是要过滤的
String.prototype.escHtmlEp = function() { return this.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(r){ return "&#"+r.charCodeAt(0)+";" }); };

//用做过滤直接放到HTML里的
String.prototype.escHtml = function() { return this.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r){ return "&#"+r.charCodeAt(0)+";" }).replace(/\r\n/g, "<BR>").replace(/\n/g, "<BR>").replace(/\r/g, "<BR>").replace(/ /g, "&nbsp;"); };

//用做过滤直接放到HTML里js中的
String.prototype.escScript = function() { return this.replace(/[\\"']/g, function(r){ return "\\"+r; }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01"); };

//用做过滤直接URL参数里的  比如 http://show8.qq.com/abc_cgi?a=XXX  XXX就是要过滤的
String.prototype.escUrl = function() { return escape(this).replace(/\+/g, "%2B"); };

//用做过滤直接放到<a href="javascript:XXXX">中的
String.prototype.escHrefScript = function() { return this.escScript().escMiniUrl().escHtmlEp(); };

//用做过滤直接放到正则表达式中的
String.prototype.escRegexp = function() { return this.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a,b){ return "\\"+a; }); };

