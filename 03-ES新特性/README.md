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