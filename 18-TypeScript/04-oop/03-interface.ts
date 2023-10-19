(function() {

  type myType = {
    readonly name: string,
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



  // 函数类型接口
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
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

  // 类类型
  interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
  }
  interface ClockInterface {
    tick(): void;
  }
  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
      return new ctor(hour, minute);
  }
  class DigitalClock implements ClockInterface {
      constructor(h: number, m: number) { }
      tick() {
          console.log("beep beep");
      }
  }
  class AnalogClock implements ClockInterface {
      constructor(h: number, m: number) { }
      tick() {
          console.log("tick tock");
      }
  }
  // 传入类构造函数
  let digital = createClock(DigitalClock, 12, 17);
  let analog = createClock(AnalogClock, 7, 32);


  // 接口继承
  interface Shape {
    color: string;
  }
  interface PenStroke {
      penWidth: number;
  }
  interface Square extends Shape, PenStroke {
      sideLength: number;
  }
  let square = <Square>{};

  

})();