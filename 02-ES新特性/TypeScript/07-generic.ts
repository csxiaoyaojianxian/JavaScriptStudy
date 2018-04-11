
function Hello<T>(arg:T):T {
	return arg;
}
var output = Hello<string>("csxiaoyao");
alert(output);


function Hello2<T>(str:T[]):T[] {
	return str;
}
var list:Array<string> = Hello2<string>(["1","2","3"]);
for(var i=0;i<list.length;i++){
	alert(list[i]);
}

// 泛型 类型
function Hello3<T>(arg:T):T {
	return arg;
}
var myHello:<K>(arg:K)=>K = Hello3;
alert(myHello("Hello"));

// 泛型 接口
interface Hello4{
	<T>(arg:T):T;
}
interface Hello5<T>{
	(arg:T):T;
}
function myHello2<T>(arg:T):T {
	return arg;
}
var MH:Hello4 = myHello2;
alert(MH<string>("Hello"));
var MH2:Hello5<number> = myHello2;
alert(MH2(100));

// 泛型 类
class HelloNumber<T>{
	Ten:T;
	add:(x:T,y:T) => T;
}
var myHelloNumber = new HelloNumber<number>();
myHelloNumber.Ten = 10;
myHelloNumber.add = function(x,y) {
	return x+y;
}
alert(myHelloNumber.Ten);
alert(myHelloNumber.add(10,20));



