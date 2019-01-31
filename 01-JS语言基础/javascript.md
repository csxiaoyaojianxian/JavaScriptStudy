# JavaScript学习总结
## 1 变量与数据类型
声明变量时可省略var关键字，但不建议
使用typeof查看变量的数据类型
### 1.1 javascript的数据类型
>number  小数与整数
string  字符串(无字符类型)
boolean  布尔数据类型
undefined  未定义

~~~
typeof 10  //number
typeof 3.14  //number
typeof 's'  //string
typeof "sunshine"  //string
typeof true  //boolean
typeof sun  //undefined
~~~
### 1.2 数据类型转换
字符串转数字
parseInt()  
~~~
parseInt("123abc123") //123 含非数字字符,将前面的数字字符转换成数字
parseInt("a123") //NaN
parseInt("012") //12 去首部0
parseInt("0x10") //16 以十六进制计算
~~~
parseFloat()  整数字符串仍转换为整数
IsNaN  (is not a muber)不是数字返回true，是数字返回false

## 2 运算符	
~~~
var a = 1;
1+true  //2
"hello"+1  //hello1
10/3  //3.3333333333333335
"sunshine">"sun"  true
10 > "9"  true string-->number
age>18?"成年人":"未成年人"
~~~
## 3 控制语句
~~~
if语句
	number  非0为true,0为false
	string  内容非空为true,内容空为false。
	undefined  false
	NaN  false
switch语句
	在javascript中case后可跟常量、变量、表达式
~~~
## 4 循环语句
for-in语句
(1)遍历数组元素,遍历出的是数组下标
~~~
var arr = [12,13,19,15,16];
for(var index in arr){
	document.write(arr[index]+",");		
}
普通for循环遍历数组元素
for(var index = 0 ; index<arr.length ; index++){
	document.write(arr[index]+",");	
}
~~~
(2)遍历对象的所有属性,遍历出的是对象的属性名
~~~
function Person(id , name){
	this.id = id;
	this.name = name;	
}
var  p = new Person(110,"sunshine");
for(var property in p){
	document.write(p[property]+",");	
}
~~~
## 5 with语句
使用with语句,在存取对象属性和调用方法时不用重复指定对象
~~~
with(document){
	write("&nbsp;");
}
function Person(id , name){
	this.id = id;
	this.name = name;
}
var p = new Person(110,"sunshine");
with(p){
	document.write("编号："+ p.id);
	document.write("姓名："+ name);
}
~~~
## 6 函数
>注意细节:
(1)定义形参时是不能使用var关键字声明变量
(2)函数没有返回值类型，如有需要直接返回即可
(3)没有函数重载，后定义的同名函数直接覆盖前面定义的同名函数
(4)任何函数内部都隐式维护了一个arguments数组对象，给函数传递数据的时候，会先传递到arguments对象中，然后再由arguments对象分配数据给形参

~~~
function add(a,b){
	var sum = a+b;	
	//return sum;
}
function add(){
	for(var index = 0 ; index<arguments.length ; index++){
		document.write(arguments[index]+",");	
	}
}
//调用函数
add(11,21,13,14);
~~~
## 7 Array数组对象
创建数组的方式
>方式1:var 变量名 = new Array(); //创建一个长度为0的数组
方式2:var 变量名 = new Array(长度) //创建一个指定长度的数组对象
方式3:var 变量名 = new Array("元素1","元素2"...) //创建指定元素的数组对象
方式4:var 变量名 = ["元素1","元素2"...];

在javascript中数组长度可变
~~~
var arr = new Array(3); //创建了一个长度为0的数组对象。
arr[100] = 10;
document.write("arr长度："+arr.length+"<br/>");//101	
var arr2 = new Array("sun1","sun2","sun3");
arr2 = ["sun4","sun5","sun6","sun7"];
document.write("arr2长度："+arr2.length+"<br/>");//4
~~~
常用方法
~~~
//【length】:返回数组长度
var length = arr1.length
//【sort】:排序，要传入排序的方法
arr1.sort(sortNumber);
function sortNumber(num1,num2){
	return num1-num2;//升序
}
//【slice】:指定数组的开始索引值与结束索引值截取数组的元素，并且返回子数组
var subArr = arr1.slice(1,2);
//【reverse】:翻转数组元素
arr1.reverse();
//【join】:使用指定的分隔符把数组中的元素拼装成一个字符串返回
var string = arr1.join(",");
//【concat】:把arr1与arr2的数组元素组成一个新的数组返回
arr1 = arr1.concat(arr2);
//【push】:将新元素添加到一个数组中，并返回数组的新长度值
var length = arr1.push("sunshine"); 
//【pop】:移除数组中的最后一个元素并返回该元素
var data = arr1.pop();
//【shift】:移除数组中第一个元素，并且返回
var data = arr1.shift();	
//【splice】:第一个参数是开始删除元素的索引值，第二参数是删除元素的个数，往后的数据是插入的元素
arr1.splice(1,1,"张三","李四","王五");
~~~
## 8 String对象
~~~
var str1 = new String("hello");
var str2 = new String("hello");
document.write("两个字符串的对象一样吗？"+(str1.toString()==str2.toString()));//true
~~~
创建一个字符串的方式
>方式1：new String("字符串的内容");
方式2：var str = "字符串的内容";

字符串常用的方法
>anchor()   生产锚点
blink()    为元素添加blink标签，显示闪动的字符串
charAt()     返回指定索引位置处的字符
charCodeAt() 回一个整数，代表指定位置上字符的 Unicode 编码	
fontcolor()  把带有 COLOR 属性的一个 HTML <FONT> 标记放置在 String 对象中的文本两端
indexOf()    返回 String 对象内第一次出现子字符串的字符位置	
italics()    把 HTML < I > 标记放置在 String 对象中的文本两端
link()         把一个有 HREF 属性的 HTML 锚点放置在 String 对象中的文本两端
replace()      返回根据正则表达式进行文字替换后的字符串的复制
split()        切割   
substr()       截取子串
toUpperCase()  转大写
toLowerCase    转小写

~~~
document.write("sunshine".anchor("anchor"));
document.write("sunshine".blink());
document.write("sunshine".charAt(3));
document.write("sunshine".charCodeAt(3)); //chatCodeAt返回的是索引值对应的字符的码值
document.write("sunshine".fontcolor("red")); //fontcolor() 给字符串添加font标签，然后设置color的属性值
document.write("sunshine".indexOf("shine")); //返回指定字符串第一次出现的索引值
document.write("sunshine".italics()); //给文本添加一个i标签，把文本内容设置成斜体
document.write("sunshine".link("http://www.csxiaoyao.com")+"<br/>"); // 给文本添加一个a标签
document.write("sunjianfeng".replace("jianfeng","shine")); // 给文本添加一个a标签
var str = "sun-shine-studio";
var arr = str.split("-");
for(var index = 0 ; index<arr.length ; index++){
	document.write(arr[index]+",");	
}
document.write("sunshine".substr(3,5));
document.write("abc".toUpperCase()); //转大写
document.write("ABC".toLowerCase());  //转小写
~~~
## 9 Number对象	
创建Number对象的方式	
>方式1:var 变量 = new Number(数字)	
方式2:var 变量 = 数字; // 十进制	

常用方法	
>toString()  把数字转换成指定进制形式的字符串，默认十进制
toFixed()   指定保留小数位(四舍五入)

~~~
var num = 10; // 十进制	
num.toString(2); // 二进制
var num2 = 3.455;
num2.toFixed(2); // 保留两位小数
~~~
## 10 Date日期对象
~~~
function getCurrentTime(){
	//获取到当前的系统时间
	var date = new Date();
	//把当前系统时间拼装成我指定的格式。
	var timeInfo =  date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 "+
date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

	//找span对象
	var spanObj = document.getElementById("time");
	//设置span标签体的内容
	spanObj.innerHTML = timeInfo.fontcolor("red");
}
getCurrentTime();
//定时方法.
window.setInterval("getCurrentTime()",1000);
~~~
## 11 Math对象
常用方法
>ceil 	  向上取整
floor()   向下取整
random()  随机数方法，产生的伪随机数介于0和1之间(含0不含1)
round     四舍五入

~~~
Math.ceil(3.14) //4
Math.floor(3.14) //3
Math.random()
Math.round(3.75) //4
~~~
## 12 自定义对象
javascript没有类的概念，只要有函数即可创建对象
方式1:使用无参函数创建对象
~~~
function Person(){}
var p = new Person(); //创建了一个Person对象
p.id = 110;
p.name = "sunshine";
~~~
方式2:使用带参的函数创建对象	
~~~
function Person(id,name){
	this.id = id;
	this.name = name;
	this.say = function(){
		alert(name+"，你好");
	}
}
var p = new Person(110,"sunshine");
~~~
方式3:使用Object函数创建对象	
~~~
var p = new Object();
p.id = 110;
p.name = "sunshine";
~~~
方式4:使用字面量的方式创建.
~~~
var p = {
	id:110,
	name:"sunshine",
	say:function(){
		alert(this.name+"，你好");
	}
}
document.write("编号："+ p.id+" 姓名："+ p.name);
p.say();
~~~
## 13 prototype
需求:把getMax方法添加到数组对象中
~~~
functoin Array(){
	this.prototype = new Object();
	this.getMax = function(){
	
	}
}
~~~
注意细节：
>1.prototype是函数(function)的一个保留属性，任何function都有
2.prototype的值是一个对象
3.可以任意修改函数的prototype属性的值。
4.一个对象会自动拥有prototype的所有成员属性和方法。

~~~
//给字符串对象添加toCharArray方法，然后再添加一个reverse(翻转)方法
//把字符串转换成字符数组
String.prototype.toCharArray = function(){
	var arr = new Array();
	for(var index = 0; index<this.length ;index++){
		arr[index] = this.charAt(index);	
	}
	return arr;
}	
String.prototype.reverse = function(){
	//字符串-->字符数组
	var arr = this.toCharArray();
	arr.reverse();
	return arr.join("");
}
var str = "sunshine-studio";
str = str.reverse();
document.write("翻转后的字符串："+str);
~~~
## 14 事件
注册事件的方式
方式一:直接在html元素上注册
~~~
<body onload="ready()">
~~~
方式二:js先找到对应的对象再注册
~~~
var bodyNode = document.getElementById("body");
bodyNode.onload = function(){
	alert("body的元素被加载完毕");	
} 
~~~	
常用事件
~~~
鼠标点击相关：
	onclick 单击
	ondblclick 双击
	onmousedown 按下按钮 
	onmouseup 释放按钮
鼠标移动相关：
	onmouseout 鼠标指针移出对象边界
	onmousemove 鼠标划过对象
焦点相关：
	onblur 对象失去输入焦点
	onfocus 对象获得焦点
其他：
	onchange 对象或选中区的内容改变 
	onload 浏览器完成对象的装载 
	onsubmit 表单将被提交
~~~
## 15 BOM浏览器对象模型
javascript组成部分
>EMCAScript ( 基本语法 )
BOM( Browser Object MOdel) 浏览器对象模型.

浏览器对象模型中把浏览器的各个部分用一个对象进行描述，如果我们要操作浏览器的一些属性，可以通过浏览器对象模型的对象进行操作
>window  代表了一个新开的窗口
location  代表了地址栏对象
screen  代表了整个屏幕的对象

### 15.1 windows窗口对象
window对象常用方法	
>open()   打开一个新的窗口。
resizeTo() 将窗口的大小更改为指定的宽度和高度值。
moveBy()  相对于原来的窗口移动指定的x、y值。 
moveTo() 将窗口左上角的屏幕位置移动到指定的 x 和 y 位置。 
setInterval() 每经过指定毫秒值后就会执行指定的代码。
clearInterval() 根据一个任务的ID取消的定时任务。
setTimeout() 经过指定毫秒值后执行指定的代码一次。

注意:使用window对象的任何属性与方法都可以省略window对象不写的。
~~~
function showAd(){
	open("ad.html","_blank","height=400px,width=400px,toolbar=no,location=no,top=200px");		
}
setTimeout("showAd()",2000);
var id = window.setInterval("showAd()",2000);
window.clearInterval(id);
resizeTo(300,200); //相对于原本窗口改变指定的大小。
window.moveBy(50,0); // 相对于原来的窗口移动指定的x、y值。	
window.moveTo(500,200);	
~~~
### 15.2 Location地址栏对象
href:设置及获取地址栏对象
reload():刷新当前页面
~~~
alert(location.href);//当前地址
location.href="http://www.csxiaoyao.com";//跳转地址
location.reload();//刷新当前页面
~~~
### 15.3 Screen屏幕对象
availHeight	获取系统屏幕的工作区域高度，排除 Microsoft Windows 任务栏 	
availWidth	获取系统屏幕的工作区域宽度，排除 Windows 任务栏
height		获取屏幕的垂直分辨率
width		获取屏幕的水平分辨率
~~~
document.write("获取系统屏幕的工作区域高度："+screen.availHeight+"<br/>");
document.write("获取系统屏幕的工作区域宽度："+screen.availWidth+"<br/>");
document.write("获取屏幕的垂直分辨率："+screen.height+"<br/>");
document.write("获取屏幕的水平分辨率："+screen.width+"<br/>");
~~~
## 16 DOM文档对象模型	
html页面被浏览器加载时，浏览器会对整个html页面上所有标签创建对应的对象进行描述，用户看到的信息是这些html对象的属性信息。只要能找到对应的对象操作对象的属性，则可以改变浏览器当前显示的内容。
~~~
var allNodes = document.all; //获取html文件中的所有标签节点
for(var i = 0; i < allNodes.length ; i++){
	alert(allNodes[i].nodeName); //标签的名字 nodeName
}
function writeUrl(){
	var links = document.links; //获取文档中含有href的属性的标签
	for(var i = 0; i<links.length ; i++){
		links[i].href = "http://www.csxiaoyao.com";
	}
}
~~~
## 17 节点查找
通过html元素的标签属性找节点
~~~
document.getElementById("html元素的id") 
document.getElementsByTagName("标签名") 
document.getElementsByName("html元素的name")
~~~
通过关系(父子关系、兄弟关系)找标签
~~~
parentNode	    获取当前元素的父节点
childNodes	    获取当前元素的所有下一级子元素
firstChild	    获取当前节点的第一个子节点
lastChild	    获取当前节点的最后一个子节点
nextSibling		获取当前节点的下一个节点（兄节点）
previousSibling	获取当前节点的上一个节点（弟节点）
~~~
通过标签的类型进行判断筛选
>文本节点的类型： 3
注释的节点类型： 8
标签节点的类型： 1

~~~
var bodyNode = document.getElementsByTagName("body")[0];
//找父结点
var parentNode = bodyNode.parentNode;
alert("父节点的名称："+parentNode.nodeName);
//找子节点，包括了空文本和注释，返回一个数组
var children = bodyNode.childNodes; 
for(var i = 0 ; i < children.length ; i++){
	if(children[i].nodeType==1){//筛选标签节点
		alert("节点的名字："+children[i].nodeName+" 对象的类型:"+children[i].nodeType);	
	}
}
alert("第一个子节点:"+bodyNode.firstChild.nodeName); 
alert("最后一个子节点:"+bodyNode.lastChild.nodeName); 
//找兄弟节点
var inputNode = document.getElementById("tag");
alert("下个兄弟节点："+inputNode.nextSibling.nodeName);
alert("上一个兄弟节点："+inputNode.previousSibling.nodeName);
~~~
## 18 节点创建、插入、删除
创建字节入插入节点、设置节点的属性。
>document.createElement("标签名")		创建新元素节点
elt.setAttribute("属性名", "属性值")	设置属性
elt.appendChild(e)						添加元素到elt中最后的位置

~~~
//创建指定标签名的节点
var inputNode = document.createElement("input"); 	
//设置节点的属性
inputNode.setAttribute("type","button");
inputNode.setAttribute("value","按钮");
//定义新节点的父节点
var bodyNode = document.getElementsByTagName("body")[0];
//appendChild添加子节点到父结点末尾
bodyNode.appendChild(inputNode);
~~~
插入目标元素的位置	 
>elt.insertBefore(newNode, oldNode);	添加到elt中，child之前，elt必须是oldNode的直接父节点
elt.removeChild(child)			    删除指定的子节点，elt必须是child的直接父节点

~~~
var newNode = document.createElement("span");
var bodyNode = document.getElementsByTagName("body")[0];
var oldNode = document.getElementsByTagName("script")[1];
bodyNode.insertBefore(newNode,oldNode);
bodyNode.removeChild(oldNode);
~~~

## 19 城市联动
~~~
省份<select id="province" onchange="showCity()">
		<option>省份</option>
		<option>广东</option>
        <option>湖南</option>
        <option>广西</option>
	</select>
城市<select id="city"><option>城市</option></select>
~~~
~~~
function showCity(){
	//维护一个二维数组存储省份对应的城市
	var citys = [[],["广州","佛山","湛江","中山"],["长沙","衡阳","岳阳","郴州"],["南宁","桂林","贵港","柳州"]];
	//获取省份对应的节点
	var provinceNode = document.getElementById("province");
	//获取省份选中的选项
	var selectIndex =  provinceNode.selectedIndex;
	//获取对应的城市
	var cityDatas = citys[selectIndex];
	//找到city节点
	var cityNode = document.getElementById("city");
	// //先清空city框所有option
	// var children = cityNode.childNodes;
	// for(var i = 0; i<children.length ; ){
	// 	cityNode.removeChild(children[i]);
	// }
	//设置options的个数，起到清空效果
	cityNode.options.length = 1 ;
	//遍历对应的所有城市然后创建对应的option添加到city上
	for(var index = 0; index<cityDatas.length ; index++){
		var option = document.createElement("option");
		option.innerHTML = cityDatas[index];
		cityNode.appendChild(option);
	}
}
~~~
## 20 操作CSS样式
~~~
//产生一个四位验证码
function createCode(){
	var datas = ['S','U','N','孙','剑','峰'];
	var code = "";
	for(var i = 0; i < 4; i++){
		//随机产生四个索引值
		var index = Math.floor(Math.random()*datas.length);
		code += datas[index];
	}
	var spanNode = document.getElementById("code");
	spanNode.innerHTML = code;
	spanNode.style.fontSize ="24px";
	spanNode.style.color = "red";
	spanNode.style.backgroundColor="gray";
	spanNode.style.textDecoration = "line-through";
}
~~~
## 21 正则表达式
正则表达式的创建方式
>方式1: /正则表达式/模式
方式2: new RegExp("正则表达式",模式);
	
正则表达式对象常用方法
>test()  使用正则对象去匹配字符串，如果匹配成功返回ture，否则返回false
exec()  根据正则表达式去查找字符串符合规则的内容

模式
>g （全文查找出现的所有pattern） 	
i （忽略大小写）

~~~
var str = "hello123";
var reg = /^[A-Z0-9]+$/i;
alert(reg.test(str));	
~~~
~~~
var str = "hello123";
var reg = /^[A-Z0-9]+$/i;
alert(reg.test(str));	
//查找出三到四个字符组成的单词。
var str  ="sun jian feng sunshine studio";
var reg = /\b[a-z]{3,4}\b/gi;
var line ="";
while((line = reg.exec(str))!=null){
	document.write(line+"<br/>")
}
~~~