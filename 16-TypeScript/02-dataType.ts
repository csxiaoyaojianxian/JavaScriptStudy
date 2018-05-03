/**
 * Boolean Number String
 * Array Enum
 * Any Void
 */
// Boolean Number String
var bool:boolean = false;
var num:number = 10;
var str:string = "sunshine";

// Array Enum
var list1:number[] = [1,2,3];
var list2:Array<string> = ["csxiaoyao","sunshine"];

enum Color {Red,Green=5,Blue=2,Purple};
var colorName1:string = Color[1]; // undefined
var colorName2:string = Color[5]; // Green
var colorName3:string = Color[2]; // Blue
var colorName4:string = Color[3]; // Purple
var colorName5:string = Color[0]; // Red
var c1:Color = Color.Green; // 5
var c2:Color = Color.Red // 0
var c3:Color = Color.Purple // 3

// Any Void
var notSure:any = 10;
notSure = "Hello";
notSure = false;
var list:any[] = [10,"hello",false];

function say():void {
	// body...
}
function tell():string {
	alert(list1[0]);
	alert(list2[1]);
	return "sunshine";
}
tell();