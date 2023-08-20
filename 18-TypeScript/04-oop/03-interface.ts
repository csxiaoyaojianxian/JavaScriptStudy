(function() {

  type myType = {
    name: string,
    age: number,
    [propName: string]: any,
  }
  const obj1: myType = {
    name: 'csxiaoyao',
    age: 18,
    gender: 'male',
  }

  // interface 接口用来定义一个类结构(属性和方法)
  // 同时接口也可以当成类型声明来使用
  interface myInterface {
    name: string;
    age: number;
  }
  // 同名interface合并属性方法
  interface myInterface {
    gender: string;
  } 
  const obj2: myInterface = {
    name: 'csxiaoyao',
    age: 18,
    gender: 'male',
  }

  // interface 和 abstract 不同的是 abstract 可以有具体的方法，interface 所有的方法都是抽象方法
  // 接口定义了类的规范标准
  interface myInter {
    name: string;
    sayHello(): void;
  }

  class MyClass implements myInter {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    sayHello(): void {
        console.log('hello');
    }
  }


})();