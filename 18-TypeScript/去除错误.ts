/*
若遇到类似 Cannot find name 'require'. 或 Cannot find name 'define'. 的错误，说明在使用模块
仅需要告诉TypeScript它们是存在的
*/

// For Node/CommonJS
declare function require(path: string): any;

// For RequireJS/AMD
declare function define(...args: any[]): any;


// 如果代码里存在下面的Node/CommonJS代码
var foo = require("foo");
foo.doStuff();

// 或者下面的RequireJS/AMD代码：
define(["foo"], function(foo) {
  foo.doStuff();
})

// 可以写做下面的TypeScript代码：
import foo = require("foo");

foo.doStuff();