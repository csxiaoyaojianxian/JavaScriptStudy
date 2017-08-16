# ES6 学习笔记

## 1. 环境配置

3种浏览器解析器在 `js/` 下

## 2. let & const

* ES6 声明变量的六种方法

  ```
  ES5：var、function
  ES6：let、const、import、class
  ```


* 块级作用域

* do 表达式

  ```javascript
  let x = do {
      let t = f();
      t * t + 1;
  };
  ```

* 顶层对象

## 3. 变量的解构赋值

* 数组的解构赋值

  ```javascript
  let [ , , param1="cs", [[param2], param3], ...param4] = [1, 2, "3", [[4], 5], 6, 7, 8]; 
  ```

* 对象的解构赋值

* 字符串的解构赋值

* 数值和布尔值的解构赋值

* 函数参数的解构赋值

## 4. 字符串的扩展

* 字符的 Unicode 表示法

* codePointAt()

* String.fromCodePoint() 

* 字符串的遍历器接口

* at()

* normalize()

* includes(), startsWith(), endsWith()

* repeat()

* padStart()，padEnd()

* 模板字符串

  ```javascript
  const tmpl = addrs => `
    <table>
    ${addrs.map(addr => `
      <tr><td>${addr.first}</td></tr>
      <tr><td>${addr.last}</td></tr>
    `).join('')}
    </table>
  `;
  const data = [
      { first: '<Jane>', last: 'Bond' },
      { first: 'Lars', last: '<Croft>' },
  ];
  document.write(tmpl(data));
  ```

* 标签模板

* String.raw()

## 5. 正则的扩展

* 构造函数
* 字符串的正则方法
* u 修饰符
* y 修饰符
* sticky 属性
* flags 属性
* s 修饰符：dotAll 模式
* 后行断言
* Unicode 属性类
* 具名组匹配

## 6. 数值的扩展

* 二进制和八进制表示法
* Number.isFinite(), Number.isNaN()
* Number.parseInt(), Number.parseFloat()
* Number.isInteger()
* Number.EPSILON
* 安全整数和Number.isSafeInteger()
* Math对象的扩展
* Math.signbit()
* 指数运算符
* Integer 数据类型

## 7. 函数的扩展

* 函数参数的默认值
* rest 参数
* 严格模式
* name 属性
* 箭头函数
* 绑定 this
* 尾调用优化
* 函数参数的尾逗号
* catch 语句的参数

## 8. 数组的扩展

* 扩展运算符
* Array.from()
* Array.of()
* 数组实例的 copyWithin()
* 数组实例的 find() 和 findIndex()
* 数组实例的fill()
* 数组实例的 entries()，keys() 和 values()
* 数组实例的 includes()
* 数组的空位

## 9. 对象的扩展

* 属性的简洁表示法
* 属性名表达式
* 方法的 name 属性
* Object.is()
* Object.assign()
* 属性的可枚举性和遍历
* Object.getOwnPropertyDescriptors()
* \__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
* Object.keys()，Object.values()，Object.entries()
* 对象的扩展运算符
* Null 传导运算符

## 10. Symbol

## 11. Set和Map数据结构

## 12. Proxy

## 13. Reflect

## 14. Promise 对象

## 15. Iterator 和 for...of 循环

## 16. Generator 函数的语法

## 17. Generator 函数的异步应用

## 18. async 函数

## 19. Class 的基本语法

## 20. Class 的继承

## 21. Decorator

## 22. Module 的语法

## 23. Module 的加载实现

