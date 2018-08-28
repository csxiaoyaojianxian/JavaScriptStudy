# Ajax数据传输_JSON
##  JSON语法
>JSON(`JavaScript Object Notation`),是`ECMAScript`的子集,作用是进行数据的交换,而且由于语法更为简洁,网络传输,以及机器解析都更为迅速.

* **语法规则:**
    * 数据在键值对中
    * 数据由逗号分隔
    * 花括号保存对象
    * 方括号保存数组
* **数据类型:**
> 下列内容 无论 键 值 都是用双引号包起来 

    * 数字（整数或浮点数）
    * 字符串（在双引号中）
    * 逻辑值（true 或 false）
    * 数组（在方括号中）
    * 对象（在花括号中）
    * null
        
* 示例代码
下部分代码看起来类似于定义`JavaScript`对象
```
// 基本对象
{
    "name":"fox",
    "age":"18",
    "sex":"true",
    "car":null
}
// 数组 
[
    {
        "name":"csxiaoyao",
        "age":"1"
    },
    {
        "name":"sunshine",
        "age":"2"
    }
]
```
##  JSON解析
> 接下来演示如何使用`JavaScript`和`PHP`对`JSON`进行解析

### JavaScript 中
* 使用`JSON`对象
    * JSON.parse()方法:将`JSON`字符串转化为`JavaScript`对象
    * JSON.stringify()方法:将`JavaScript`对象,转化为`JSON`字符串
    * 由于老式`IE(8以下)`浏览器中没有`JSON`对象,通过导入`JSON2.js`框架即可解决,框架获取地址为:[JSON2.js_github地址][1]
```javascript
var Obj = {
	name:"csxiaoyao",
	age:18,
};
// 将JavaScript对象格式化为JSON字符串
var jsonStr = JSON.stringify(Obj);
// 将JSON字符串转化为JavaScript对象
var jsonObj = JSON.parse(jsonStr);
```
* 使用`eval()`方法
使用`eval()`方法需要注意的是,需要将内容使用`()括号`包裹起来,如示例代码
```javascript
var jsonStr = `{
	"name":"csxiaoyao",
	"age":18,
}`;
var jsonObj = eval('('+jsonStr+')');
```
### PHP中
* **json_decode()**方法: 将`json`字符串转化为变量
* **json_encode()**方法: 将变量转化为`json`字符串
* **示例代码:**
```php
<?php 
	header("Content-Type:text/html;charset=utf-8");
	// json字符串
	$jsonStr = '{"name":"csxiaoyao","age":24}';
	// 字符串转化为 php对象
  	print_r(json_decode($jsonStr));
  	echo "<br>";
  	// php数组
  	$arrayName = array('name' =>'csxiaoyao' ,'age' => 24 );
  	// php对象 转化为 json字符串
  	print_r(json_encode($arrayName));
 ?>
```
* 输出结果为:   
```
stdClass Object ( [name] => csxiaoyao [age] => 24 ) 
{"name":"csxiaoyao","age":24}
```
  [1]: https://github.com/douglascrockford/JSON-js