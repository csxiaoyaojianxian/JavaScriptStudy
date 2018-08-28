// 指定类型
function add(x:number,y:number):string {
	return (x+y).toString();
}
var myAdd = function(x:number,y:string):string {
	return x+y;
}
var myAddTs:(name:string,age:number)=>number = function(n:string,a:number):number {
	return a;
}

// 可选参数
function buildName(firstName:string,lastName?:string) {
	if(lastName){
		return lastName+" "+firstName;
	}else{
		return firstName;
	}
}
var result1 = buildName("jianfeng","sun");
var result2 = buildName("jianfeng");

// 默认参数
function buildName2(firstName:string,lastName="sun") {
	return lastName+" "+firstName;
}
var result3 = buildName("jianfeng","sun");
var result4 = buildName("jianfeng");

// 可变参数
function peopleName(firstName:string, ...restOfName:string[]) {
	return firstName+" "+restOfName.join("-");
}
var pn = peopleName("sunshine","sun","jianfeng");

// lambada & this
var people = {
	name:["sun","jianfeng","csxiaoyao"],
	getName:function() {
		return ()=>{ // lambada
			var i = 1;
			return {
				n:this.name[i]
			}
		}
	}
}
var p = people.getName();
alert( p().n );

// reload
function attr(name:string):string;
function attr(age:number):number;
function attr(nameOrAge:any):any{
	if(nameOrAge && typeof nameOrAge === "string"){
		alert("姓名");
	}else{
		alert("年龄");
	}
}
attr("csxiaoyao"); // 姓名
attr(25); // 年龄



