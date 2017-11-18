---
style: ocean
---
# jQuery常用技巧整理
[TOC]
> Write By CS逍遥剑仙
> 我的主页: [www.csxiaoyao.com](http://www.csxiaoyao.com)
> GitHub: [github.com/csxiaoyaojianxian](https://github.com/csxiaoyaojianxian)
> Email: sunjianfeng@csxiaoyao.com
> QQ: [1724338257](wpa.qq.com/msgrd?uin=1724338257&site=qq&menu=yes)
## 1. 坐标操作
### 1.1 offset()
作用：获取或设置元素相对于文档的位置，{left:num, top:num}
```
$(selector).offset();
$(selector).offset({left:100, top: 100});
```
注意：设置offset后，如果元素没有定位(默认值：static)，则被修改为relative
### 1.2 position()
作用：获取相对于其最近的具有定位的父元素的位置，{left:num, top:num}
```
$(selector).position();
```
注意：只能获取，不能设置
### 1.3 scroll() / scrollTop() / scrollLeft()
#### 1.3.1 scroll( handler )
作用：绑定滚动事件
#### 1.3.2 scrollTop() / scrollLeft()
作用：获取或设置元素垂直/水平方向滚动的位置
```
$(selector).scrollLeft()
$(selector).scrollTop(100);
```
## 2. 事件机制
jQuery对JavaScript操作DOM事件的封装包括：事件绑定、事件解绑、事件触发，jQuery事件的发展历程为：简单事件绑定 -> bind事件绑定 -> delegate事件绑定 -> on事件绑定
### 2.1 简单事件绑定
click、dbclick、focus、blur、keydown、mouseenter、mouseleave、change(handler) 改变事件，如：文本框值改变，下拉列表值改变等
### 2.2 bind事件绑定 (不推荐，1.7后被on取代）
可同时绑定多个事件，但要绑定事件的元素必须存在文档中
```
$("p").bind("click mouseenter", function(e){});
```
### 2.3 delegate事件绑定
性能高，支持动态创建的元素
```
$(".parent").delegate("p", "click", function(){
	//为.parent下所有p标签绑定事件
});
```
### 2.4 on事件绑定 (推荐)
兼容zepto，jQuery1.7后on统一了所有的事件处理方法
**参数1**：events，支持多个标准或自定义事件
**参数2**：selector，指定后代元素
**参数3**：data，传递给处理函数的数据，事件触发时通过event.data调用
**参数4**：handler
`$(selector).on(events[,selector][,data],handler);`
```
$(selector).on("click mouseenter","span", function(){});
```
### 2.5 事件解绑
**unbind() / undelegate()**
```
$(selector).unbind(); //解绑所有的bind事件
$(selector).unbind("click"); //解绑指定的bind事件
$(selector).undelegate(); //解绑所有的delegate事件
$(selector).undelegate("click"); //解绑指定的delegate事件
```
**off() (推荐)**
```
$(selector).off(); // 解绑匹配元素的所有事件
$(selector).off("click"); // 解绑匹配元素的所有click事件
$(selector).off("click","..."); // 解绑所有delegate的click事件，元素本身的事件不会被解绑
```
### 2.6 事件触发
**简单事件触发**
```
$(selector).click();
```
**trigger方法触发事件，触发浏览器行为**
```
$(selector).trigger("click");
```
**triggerHandler方法触发事件，不触发浏览器行为**
```
// 文本框获得焦点的默认行为
$(selector).triggerHandler("focus");
```
### 2.7 jQuery事件对象
**event.data** 传递给事件处理程序的额外数据
**event.currentTarget** 当前DOM对象，等同于this
**event.target** 触发事件源，不一定等同于this
**event.type** 事件类型：click，dbclick…
**event.pageX** 鼠标相对于文档左部边缘的位置
**event.which** 鼠标按键类型：左1 中2 右3
**event.keyCode** 键盘按键代码
**event.preventDefault();** 阻止默认行为
**event.stopPropagation();** 阻止事件冒泡

## 3. 链式编程
原理：return this;
`end();` 结束当前链条中最近的筛选操作，并将匹配元素集还原为之前的状态

## 4. 多库共存
同时引用了不同版本的jquery或变量`$`等冲突，使用`noConflict()`释放控制权
```
// 先后引入jquery1，jquery2
$.noConflict(); // 释放对 $ 的控制权
console.log($.fn.jquery); // 输出jquery1的版本号
console.log(jQuery.fn.jquery); // 输出jquery2的版本号
```
## 5. 添加插件
```
$.pluginName = function(){}; // 全局jQuery函数扩展方法
$.fn. pluginName = function(){}; // jQuery对象扩展方法
```
![www.csxiaoyao.com](http://www.csxiaoyao.com/src/img/sign.jpg)