/**
 * Boolean Number String
 * Array Enum
 * Any Void
 */
// 【 Boolean 】
let isDone: boolean = false
// 【 Number 】
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100 // ECMAScript 2015 中引入的二进制字面量
let octalLiteral: number = 0o24 // ECMAScript 2015 中引入的八进制字面量
// 【 String 】
var nameStr: string = 'csxiaoyao'
let sentence: string = `Hello, my name is ${ nameStr }. I'm ${ decLiteral + 1 } years old.`
// 【 Array 】 两种方式
var list1: number[] = [1,2,3];
var list2: Array<string> = ["csxiaoyao","sunshine"];

// 【 Tuple 】 元祖，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number]
x = ['hello', 10] // OK

// 【 Enum 】 使用枚举类型可以为一组数值赋予友好的名字，可以由枚举的值得到它的名字
enum Color { Red, Green=5, Blue=2, Purple };
var colorName0: string = Color[0]; // Red
var colorName1: string = Color[1]; // undefined
var colorName2: string = Color[2]; // Blue
var colorName3: string = Color[3]; // Purple
var colorName5: string = Color[5]; // Green

var c1: Color = Color.Green; // 5
var c2: Color = Color.Red // 0
var c3: Color = Color.Purple // 3

// 【 Any 】
var notSure: any = 10;
notSure = "Hello";
notSure = false;
var list: any[] = [10, "hello", false];

// 【 Void 】 和 any 类型相反，表示没有任何类型
// 声明一个void类型的变量没有什么大用，只能赋值 undefined / null
function say(): void {
  // body...
}
let unusable: void = undefined;

// 【 null 】 / 【 undefined 】  默认情况下 null 和 undefined 是所有类型的子类型
let u: undefined = undefined
let n: null = null
// decLiteral = n; // 配置 --strictNullChecks，否则，可以把 null 和 undefined 赋值给其他类型的变量

// 【 never 】表示永不存在的值的类型
function error(message: string): never {
	throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
	while (true) {
	}
}

// 【 object 】 表示非原始类型，即除 number，string，boolean，symbol，null或undefined 之外的类型
declare function create(o: object | null): void
create({ prop: 0 }) // OK
create(null) // OK
// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

// 【 类型断言 】 两种方式
let someValue: any = 'this is a string'
// 方式1：尖括号
let strLength1: number = (<string>someValue).length
// 方式1：as
let strLength2: number = (someValue as string).length