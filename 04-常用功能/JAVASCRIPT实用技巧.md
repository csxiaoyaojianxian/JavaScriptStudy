# 总结收藏的41个JavaScript实用技巧
1. 将彻底屏蔽鼠标右键
~~~
oncontextmenu=”window.event.returnValue=false”
< table border oncontextmenu=return(false)>< td>no< /table>
~~~
可用于 table
2. 取消选取、防止复制
~~~
< body onselectstart=”return false”>
~~~
3. JS不允许粘贴
~~~
onpaste=”return false”
~~~
4. JS防止复制
~~~
oncopy=”return false;” oncut=”return false;”
~~~
5. IE 地址栏前换成自己的图标
~~~
< link rel=”Shortcut Icon” href=”favicon.ico”>
~~~
在文件的根目录放进去这个图片，后缀修改成ico就可以了
6. 可以在收藏夹中显示出你的图标
~~~
< link rel=”Bookmark” href=”favicon.ico”>
~~~
7. 关闭输入法
~~~
< input style=”ime-mode:disabled”>
~~~
8. 永远都会带着框架
~~~
< script language=”JavaScript”>< !– if (window == top)top.location.href = “frames.htm”; //frames.htm 为框架网页 // –>< /script>
~~~
9. 防止被人 frame
~~~
< SCRIPT LANGUAGE=JAVASCRIPT>< !– if (top.location != self.location)top.location=self.location; // –>< /SCRIPT>
~~~
10. 网页将不能被另存为
~~~
< noscript>< iframe src=x.html>< /iframe>< /noscript>
~~~
11. 网页源代码
~~~
< input type=button value=查看网页源代码 onclick=”window.location = “view-source:”+ “http://www.csxiaoyao.com””>
~~~
12. 删除时确认
~~~
< a href=”javascript:if(confirm(” 确 实 要 删 除 吗 ?”))location=”boos.asp?&areyou= 删 除 &page=1″”>删除< /a>
~~~
13. 取得控件的绝对位置
//Javascript
~~~
< script language=”Javascript”>
function getIE(e){
	var t=e.offsetTop;
	var l=e.offsetLeft;
	while(e=e.offsetParent){
		t+=e.offsetTop;
		l+=e.offsetLeft;
	}
	alert(“top=”+t+”/nleft=”+l);
}
< /script>
~~~
//VBScript
~~~
< script language=”VBScript”>< !–
function getIE()
dim t,l,a,b
set a=document.all.img1
t=document.all.img1.offsetTop
l=document.all.img1.offsetLeft
while a.tagName< >”BODY”
set a = a.offsetParent
t=t+a.offsetTop
l=l+a.offsetLeft
wend
msgbox “top=”&t&chr(13)&”left=”&l,64,”得到控件的位置”
end function
–>< /script>
~~~
14. 光标是停在文本框文字的最后
~~~
< script language=”javascript”>
function cc()
{
var e = event.srcElement;
var r =e.createTextRange();
r.moveStart(“character”,e.value.length);
r.collapse(true);
r.select();
}
< /script>
< input type=text name=text1 value=”123″ onfocus=”cc()”>
~~~
15. 判断上一页的来源
~~~
javascript:document.referrer
~~~
16. 最小化、最大化、关闭窗口
~~~
< object id=hh1 classid=”clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11″>
< param name=”Command” value=”Minimize”>< /object>
< object id=hh2 classid=”clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11″>
< param name=”Command” value=”Maximize”>< /object>
< OBJECT id=hh3 classid=”clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11″>
< PARAM NAME=”Command” VALUE=”Close”>< /OBJECT>
< input type=button value=最小化 onclick=hh1.Click()>
< input type=button value=最大化 onclick=hh2.Click()>
< input type=button value=关闭 onclick=hh3.Click()>
~~~
本例适用于 IE
17. 屏蔽功能键 Shift,Alt,Ctrl
~~~
< script>
function look(){
if(event.shiftKey)
alert(“禁止按 Shift 键!”); //可以换成 ALT CTRL
}
document.onkeydown=look;
< /script>
~~~
18. 网页不会被缓存
~~~
< META HTTP-EQUIV=”pragma” CONTENT=”no-cache”>
< META HTTP-EQUIV=”Cache-Control” CONTENT=”no-cache, must-revalidate”>
< META HTTP-EQUIV=”expires” CONTENT=”Wed, 26 Feb 1997 08:21:57 GMT”>
或者< META HTTP-EQUIV=”expires” CONTENT=”0″>
~~~
19. 怎样让表单没有凹凸感?
~~~
< input type=text style=”border:1 solid #000000″>
或
< input type=text style=”border-left:none; border-right:none; border-top:none; border-bottom: 1 solid #000000″>< /textarea>
~~~
20. < div>< span>&< layer>的区别?
~~~
< div>(division)用来定义大段的页面元素，会产生转行
< span>用来定义同一行内的元素，跟< div>的唯一区别是不产生转行
< layer>是 ns 的标记，ie 不支持，相当于< div>
~~~
21. 让弹出窗口总是在最上面:
~~~
< body onblur=”this.focus();”>
~~~
22. 不要滚动条?
让竖条没有:
~~~
< body style=”overflow:scroll;overflow-y:hidden”>
< /body>
~~~
让横条没有:
~~~
< body style=”overflow:scroll;overflow-x:hidden”>
< /body>
~~~
两个都去掉？更简单了
~~~
< body scroll=”no”>
< /body>
~~~
23. 怎样去掉图片链接点击后，图片周围的虚线？
~~~
< a href=”#” onFocus=”this.blur()”>< img src=”logo.jpg” border=0>< /a>
~~~
24. 电子邮件处理提交表单
~~~
< form name=”form1″ method=”post” action=”mailto:sunjianfeng@csxiaoyao.com” enctype=”text/plain”>
< input type=submit>
< /form>
~~~
25. 在打开的子窗口刷新父窗口的代码里如何写？
~~~
window.opener.location.reload()
~~~
26. 如何设定打开页面的大小
~~~
< body onload=”top.resizeTo(300,200);”>
~~~
打开页面的位置
~~~
< body onload=”top.moveBy(300,200);”>
~~~
27. 在页面中如何加入不是满铺的背景图片,拉动页面时背景图不动
~~~
< STYLE>
body
{background-image:none; background-repeat:no-repeat;
background-position:center;background-attachment: fixed}
< /STYLE>
~~~
28. 检查一段字符串是否全由数字组成
~~~
< script language=”Javascript”>< !– function checkNum(str){return str.match(//D/)==null} alert(checkNum(“1232142141”)) alert(checkNum(“123214214a1”)) // –>< /script>
~~~
29. 获得一个窗口的大小
~~~
document.body.clientWidth; document.body.clientHeight
~~~
30. 怎么判断是否是字符
~~~
if (/[^/x00-/xff]/g.test(s)) alert(“含有汉字”);
else alert(“全是字符”);
~~~
31.TEXTAREA 自适应文字行数的多少
~~~
< textarea rows=1 name=s1 cols=27 onpropertychange=”this.style.posHeight=this.scrollHeight”>
< /textarea>
~~~
32. 日期减去天数等于第二个日期
~~~
< script language=Javascript>
function cc(dd,dadd)
{
//可以加上错误处理
var a = new Date(dd)
a = a.valueOf()
a = a – dadd * 24 * 60 * 60 * 1000
a = new Date(a)
alert(a.getFullYear() + “年” + (a.getMonth() + 1) + “月” + a.getDate() + “日”)
}
cc(“12/23/2002”,2)
< /script>
~~~
33. 选择了哪一个 Radio
~~~
< HTML>< script language=”vbscript”>
function checkme()
for each ob in radio1
if ob.checked then window.alert ob.value
next
end function
< /script>< BODY>
< INPUT name=”radio1″ type=”radio” value=”style” checked>Style
< INPUT name=”radio1″ type=”radio” value=”barcode”>Barcode
< INPUT type=”button” value=”check” onclick=”checkme()”>
< /BODY>< /HTML>
~~~
34. 脚本永不出错
~~~
< SCRIPT LANGUAGE=”JavaScript”>
< !– Hide function killErrors() { return true; } window.onerror = killErrors; // –>
< /SCRIPT>
~~~
35. ENTER 键可以让光标移到下一个输入框
~~~
< input onkeydown=”if(event.keyCode==13)event.keyCode=9″>
~~~
36. 检测某个网站的链接速度：
把如下代码加入< body>区域中:
~~~
< script language=Javascript>
tim=1
setInterval(“tim++”,100)
b=1
var autourl=new Array()
autourl[1]=”www.csxiaoyao.com”
autourl[2]=”www.baidu.com”
autourl[3]=”www.sina.com.cn”
autourl[4]=”blog.csxiaoyao.com”
autourl[5]=”www.cctv.com”
function butt(){
document.write(“< form name=autof>”)
for(var i=1;i< autourl.length;i++)
document.write(“< input type=text name=txt”+i+” size=10 value=测试中……> =》< input type=text name=url”+i+” size=40> =》< input type=button value=GO onclick=window.open(this.form.url”+i+”.value)>
“)
document.write(“< input type=submit value=刷新>< /form>”)
}
butt()
function auto(url){
document.forms[0][“url”+b].value=url
if(tim>200)
{document.forms[0][“txt”+b].value=”链接超时”}
else
{document.forms[0][“txt”+b].value=”时间”+tim/10+”秒”}
b++
}
function run(){for(var i=1;i< autourl.length;i++)document.write(“< img src=http://”+autourl+”/”+Math.random()+” width=1 height=1 onerror=auto(“http://”+autourl+””)>”)}
run()< /script>
~~~
37. 各种样式的光标
~~~
auto ：标准光标
default ：标准箭头
hand ：手形光标
wait ：等待光标
text ：I 形光标
vertical-text ：水平 I 形光标
no-drop ：不可拖动光标
not-allowed ：无效光标
help ：?帮助光标
all-scroll ：三角方向标
move ：移动标
crosshair ：十字标
e-resize
n-resize
nw-resize
w-resize
s-resize
se-resize
sw-resize
~~~
38. 页面进入和退出的特效
进入页面< meta http-equiv=”Page-Enter” content=”revealTrans(duration=x, transition=y)”>
推出页面< meta http-equiv=”Page-Exit” content=”revealTrans(duration=x, transition=y)”>
这个是页面被载入和调出时的一些特效。duration 表示特效的持续时间，以秒为单位。
transition 表示使用哪种特效，取值为
1-23:
0 矩形缩小
1 矩形扩大
2 圆形缩小
3 圆形扩大
4 下到上刷新
5 上到下刷新
6 左到右刷新
7 右到左刷新
8 竖百叶窗
9 横百叶窗
10 错位横百叶窗
11 错位竖百叶窗
12 点扩散
13 左右到中间刷新
14 中间到左右刷新
15 中间到上下
16 上下到中间
17 右下到左上
18 右上到左下
19 左上到右下
20 左下到右上
21 横条
22 竖条
23 以上 22 种随机选择一种
39. 在规定时间内跳转
~~~
< META http-equiv=V=”REFRESH” content=”5;URL=http://www.csxiaoyao.com”>
~~~
40. 网页是否被检索
~~~
< meta name=”ROBOTS” content=”属性值”>
~~~
其中属性值有以下一些:
属性值为”all”: 文件将被检索，且页上链接可被查询；
属性值为”none”: 文件不被检索，而且不查询页上的链接；
属性值为”index”: 文件将被检索；
属性值为”follow”: 查询页上的链接；
属性值为”noindex”: 文件不检索，但可被查询链接；
属性值为”nofollow”: 文件不被检索，但可查询页上的链接。
41. 回车
用客户端脚本在页面添加document 的onkeydown事件,让页面在接受到回车事件后,进行Tab
键的功能,即只要把 event 的 keyCode 由 13 变为 9
这样的处理方式,可以实现焦点往下移动,但对于按钮也起同样的作用,一般的客户在输入完
资料以后,跳到按钮后,最好能直接按”回车”进行数据的提交.因此,对上面的方法要进行一下
修改,应该对于”提交”按钮不进行焦点转移.而直接激活提交.
判断是否为 button, 是因为在 HTML 上会有 type=”button”
判断是否为 submit,是因为 HTML 上会有 type=”submit”
判断是否为 reset,是因为 HTML 上的”重置”应该要被执行
判断是否为空,是因为对于 HTML 上的”链接”也应该被执行，这种情况发生的情况不多，可以使用”tabindex=-1″的方式来取消链接获得焦点。