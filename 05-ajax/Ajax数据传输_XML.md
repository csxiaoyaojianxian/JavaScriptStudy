# Ajax数据传输_XML
## XML简介
>XML 指可扩展标记语言`EXtensible Markup Language`,他设计的时候是用来传递数据的,虽然格式跟`HTML`类似.
* **xml示例**
下面是一个XML示例
```
<?xml version="1.0" encoding="UTF-8"?>
<singer>
	<name>sunshine</name>
	<age>18</age>
</note>
```
* **xml是纯文本**
`XML`是纯文本,这点跟`HTML`很像,所以我们可以用任何的`文本编辑`软件去打开编辑它

## XML语法
>虽然看起来跟`HTML`类似,但是`XML`的语法有些需要注意的,更为详细的可以查阅[w3cschool_xml教程][1]

* **XML声明**
第一行是XML的声明,指定`XML`版本(1.0)以及使用的编码(UTF-8万国码)
```
<?xml version="1.0" encoding="UTF-8"?>
```
* **自定义标签**
`XML`中没有默认的标签,所有的标签都是我们定义者`自定义的`
```
<!-- 下列标签都是被允许的 --> 
<fox></fox>
<name></name>
```
* **双标签**
`XML`中没有单标签,都是双标签
```
<haha>标签内</haha>
```
* **根节点**
`XML`中必须有一个根节点,所有的子节点都放置在根节点下
```
<root>
    <name></name>
</root>
```
* **XML属性**
跟`HTML`一样,`XML`的标签里面也能够添加属性`type = 'text'`,但是不建议这样用,而是使用标签的方式来表述内容(下半部分代码)

```xml
<!-- 使用属性配合标签表述信息 --> 
<person sex="female">
  <firstname>Anna</firstname>
  <lastname>Smith</lastname>
</person> 
<!-- 使用标签来表述信息 --> 
<person>
  <sex>female</sex>
  <firstname>Anna</firstname>
  <lastname>Smith</lastname>
</person> 
```
## **XML解析**
因为`XML`就是标签,所以直接用解析`Dom`元素的方法解析即可

* **html代码**
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<person id='personXML'>
	    <name>fox</name>
	    <age>18</age>
    </person>
</body>
</html>
```
```JavaScript
获取方法
<script type="text/javascript">
	var xmlObj = document.getElementById("personXML");
	var name = xmlObj.getElementsByTagName('name')[0].innerHTML;
	console.log(name);
</script>
```
## PHP中设置Header
>在php中如果要使用xml传输数据,需要使用`header()`设置返回的内容为xml

```
header('content-type:text/xml;charset=utf-8');
```
  [1]: http://www.w3school.com.cn/xml/index.asp