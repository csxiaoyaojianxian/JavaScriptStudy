// 非接口实现
function printLabel( labelObj:{label:string} ) {
	console.log(labelObj.label);
}
var myObj = {label:"hello"};
printLabel(myObj);

// 接口 可选属性
interface Person {
	name:string;
	age?:number;
}
function printPerson( p:Person ) {
	console.log(p.name);
}
var people = {name:"csxiaoyao"}; // 没有age属性
printPerson(people); // csxiaoyao

// 接口 函数类型
interface SearchFunc {
	(source:string,subString:string):boolean;
}
var mySearch:SearchFunc;
mySearch = function(src:string,sub:string) {
	var result = src.search(sub);
	if(result != -1){
		return true;
	}else{
		return false;
	}
}

// 接口 数组类型
interface StringArray{
	[index:number]:string;
}
var myArray:StringArray;
myArray = ["csxiaoyao","sunshine"];
alert(myArray[1]);

// 接口 class类型
interface ClockInterface{
	currentTime:Date;
	setTime(d:Date);
}
class Clock implements ClockInterface{
	currentTime:Date;
	setTime(d:Date){
		this.currentTime = d;
	}
	constructor(h:number, m:number){

	}
}

// 接口 继承
interface Shape{
	color:string;
}
interface PenStroke{
	penWidth:number;
}
interface Square extends Shape,PenStroke {
	sideLength: number;
}
var s = <Square>{};
s.color = "blue";
s.penWidth = 10;
s.sideLength = 10;

// 接口 混合类型
interface Counter{
	interval:number;
	reset():void;
	(srart:number):string;
}
var c:Counter;
c(10);
c.reset();

