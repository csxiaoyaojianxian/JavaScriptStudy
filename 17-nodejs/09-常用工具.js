
var util = require('util');

// 1. 【util.inherits】
// util.inherits(constructor, superConstructor) 实现对象间原型继承
// 定义基对象Base和继承自Base的Sub
// 注意：Sub 仅仅继承了 Base 在原型中定义的函数，而构造函数内部创造的 base 属性和 sayHello 函数都没有被 Sub 继承
function Base() { 
	this.name = 'base'; 
	this.base = 2012; 
	this.sayHello = function() { 
    console.log('Hello ' + this.name); 
	}; 
} 
Base.prototype.showName = function() { 
	console.log(this.name);
}; 
function Sub() { 
	this.name = 'sub'; 
} 
util.inherits(Sub, Base); // sub继承base
var objBase = new Base(); 
objBase.showName(); // base
objBase.sayHello(); // Hello base
console.log(objBase); // Base { name: 'base', base: 2012, sayHello: [Function] }
var objSub = new Sub();
objSub.showName(); // sub
// objSub.sayHello();
console.log(objSub); // Sub { name: 'sub' }

// 2. 【util.inspect】
// util.inspect(object,[showHidden],[depth],[colors])  将任意对象转换为字符串，通常用于调试和错误输出
//   showHidden 值为 true 会输出更多隐藏信息
//   depth 最大递归的层数(默认2层)，指定层数以控制输出复杂对象信息的多少，null表示不限递归层数完整遍历对象
//   color 值为 true 则输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮的效果
// 注意：util.inspect 不会简单地直接把对象转换为字符串，即使该对象定义了toString 方法也不会调用
function Person() { 
	this.name = 'csxiaoyao'; 
	this.toString = function() { 
    	return this.name; 
	}; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); 
// Person { name: 'csxiaoyao', toString: [Function] }
// Person {
//   name: 'csxiaoyao',
//   toString:
//    { [Function]
//      [length]: 0,
//      [name]: '',
//      [arguments]: null,
//      [caller]: null,
//      [prototype]: { [constructor]: [Circular] } } }

// 3. 【util.isArray】
// util.isArray(object)
util.isArray([]) // true
util.isArray(new Array) // true
util.isArray({}) // false

// 4. 【util.isRegExp】
util.isRegExp(object)
util.isRegExp(/some regexp/) // true
util.isRegExp(new RegExp('another regexp')) // true
util.isRegExp({}) // false

// 5. 【util.isDate】
util.isDate(object)
util.isDate(new Date()) // true
util.isDate(Date()) // false (without 'new' returns a String)
util.isDate({}) // false

// 6. 【util.isError】
util.isError(object)
util.isError(new Error()) // true
util.isError(new TypeError()) // true
util.isError({ name: 'Error', message: 'an error occurred' }) // false