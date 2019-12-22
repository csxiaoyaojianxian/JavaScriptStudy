/**
 * Boolean Number String
 * Array Enum
 * Any Void
 */
// Boolean
let isDone: boolean = false
// Number
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
// String
var nameStr: string = 'csxiaoyao'
let sentence: string = `Hello, my name is ${ name }. I'm ${ decLiteral + 1 } years old.`
// Array 两种方式
var list1:number[] = [1,2,3];
var list2:Array<string> = ["csxiaoyao","sunshine"];

// 【 Tuple 】 元祖，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number]
x = ['hello', 10] // OK

// Enum
enum Color { Red, Green=5, Blue=2, Purple };
var colorName0: string = Color[0]; // Red
var colorName1: string = Color[1]; // undefined
var colorName2: string = Color[2]; // Blue
var colorName3: string = Color[3]; // Purple
var colorName5: string = Color[5]; // Green

var c1: Color = Color.Green; // 5
var c2: Color = Color.Red // 0
var c3: Color = Color.Purple // 3

// Any
var notSure: any = 10;
notSure = "Hello";
notSure = false;
var list: any[] = [10, "hello", false];

// Void
function say(): void {
	// body...
}
function tell(): string {
	alert(list1[0]);
	alert(list2[1]);
	return "sunshine";
}
tell();

// null / undefined
let u: undefined = undefined
let n: null = null

// never，返回never的函数必须存在无法达到的终点
function error(message: string): never {
	throw new Error(message)
}
function infiniteLoop(): never {
	while (true) {
	}
}

// object
// object 表示非原始类型，即除 number，string，boolean，symbol，null或undefined 之外的类型
declare function create(o: object | null): void
create({ prop: 0 }) // OK
create(null) // OK

// 类型断言，两种方式
let someValue: any = 'this is a string'
let strLength1: number = (<string>someValue).length
let strLength2: number = (someValue as string).length