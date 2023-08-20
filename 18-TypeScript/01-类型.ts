/**
 * number
 * string
 * boolean
 * 字面量    如下方a、b
 * any
 * unknown  类型安全的any
 * void     空值(undefined/null)，主要用于函数返回值
 * never    不能是任何值
 * object
 * array
 * tuple    元组，ts新增类型，固定长度数组
 * enum     enum{A,B} 枚举，ts新增类型
 */

let s: string;

// 字面量
let a: 'male' | 'female';
let b: boolean | string | number;

// any & unknown
let c: any;
s = c;
let d: unknown; // 表示未知类型的值，是一个类型安全的any，区别在于不能直接赋值给其他变量
d = 10;
d = 'hello';
d = true;
// s = d;
if (typeof d === 'string') {
  s = d;
}

// 类型断言
s = d as string; // 变量 as 类型
s = <string>d; // <类型>变量

// void 
function fn(): void {}

// never 表示永远不会返回结果
function fn2(): never {
  throw new Error('报错，立即结束，无返回值');
}

// object
let e: object;
e = {};
e = function (){}
// {} 用于指定对象包含的属性, ?表示属性可选，[propName:string]:any表示任意类型的属性
let f: {name: string, age?: number, [propName: string]: any};
f = {name: 'sunshine', xxx: 1};

// 函数结构类型声明
let g: (a:number,b:number)=>number;
g = function(n1: number, n2: number): number {
  return 10;
}

// 数组
let h: string[];
let i: Array<number>;

// tuple 元组，固定长度数组
let j: [string, number];
j = ['hello', 0];

// enum 枚举
/*
let k: { name: string, gender: 0 | 1};
k = {
  name: 'sunshine',
  gender: 0,
}
console.log(k.gender === 0);*/
enum Gender {
  Male = 0,
  Female = 1,
}
let k: { name: string, gender: Gender};
k = {
  name: 'sunshine',
  gender: Gender.Male,
}
console.log(k.gender === Gender.Male);

// &且 |或
let l: {name: string} & {age: number};
l = {name: 'sunshine', age: 1}
let m: 1|2|3;

// 类型别名
type myType = 1|2|3;
let n: myType;





