class Person {
	public name:string;
	private age:number;
	constructor(name:string,age:number){
		this.name = name;
		this.age = age;
	}
	tell(){
		return this.name + ":" + this.age;
	}
}
class Student extends Person {
	school:string;
	constructor(name:string,age:number,school:string){
		super(name,age);
		this.school = school;
	}
	tell(){
		// return this.name + ":" + this.age + ":" + this.school;
		return this.name + ":" + this.school;
	}
}


var p = new Person("csxiaoyao",25);
p.name = "csxiaoyao~"; // public
// p.age = 26; // private
alert(p.tell());

var s = new Student("csxiaoyao",25,"USTC");
s.school = "USTC~"; // public
alert(s.tell());