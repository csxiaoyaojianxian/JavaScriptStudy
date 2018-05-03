// Accessors are only available when targeting ECMAScript 5 and higher.

class Person {
	private _name:string;
	static age:number;
	get name():string {
		return this._name;
	}
	set name(newName:string) {
		this._name = newName;
	}
	tell(){
		return this.name + ":" + this.age;
	}
}

var p:Person;
p = new Person();

// 【 accessors 】
p.name = "csxiaoyao";

// 【 static 】
Person.age = 25;
// p.age = 25;

alert(p.tell());