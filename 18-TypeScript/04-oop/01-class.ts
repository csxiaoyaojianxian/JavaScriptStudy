

class Person {

  // 实例属性
  age: number = 30;
  readonly name: string = 'csxiaoyao';

  // 静态属性
  static ageStatic: number = 18;
  static readonly nameStatic: string = 'csxiaoyao';

  // 构造函数
  constructor(age: number) {
    // 在构造函数中this表示当前实例
    console.log(this);
    this.age = age;
  }

  // 实例方法
  sayHello() {
    console.log('Hello～');
  }

  // 静态方法
  static sayHelloStatic() {
    console.log('Hello Static～');
  }

}

// NbPerson 子类继承 Person 父类
class NbPerson extends Person {

  ability: Array<string>;

  constructor(age: number, ability: Array<string> = []) {
    // 子类若含有构造函数，必须调用父类构造函数
    super(age);
    this.ability = ability;
  }

  // 覆盖
  sayHello() {
    console.log('～～～');
    // super 表示当前类的父类
    super.sayHello();
  }

  // 子类增加方法
  fly() {
    console.log('fly');
  }
}

const per = new Person(18);
console.log(Person.ageStatic, per.name);
Person.sayHelloStatic();
per.sayHello();
const nb = new NbPerson(20);
nb.sayHello();
nb.fly();