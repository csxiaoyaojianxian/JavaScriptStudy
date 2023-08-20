// 抽象类
(function() {

  // abstract 抽象类用于禁止直接创建对象，只有来继承
  abstract class Animal {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    // 抽象类允许添加抽象方法，子类必须重写抽象方法
    abstract sayHello(): void;
  }

  class Dog extends Animal {
    sayHello(): void {
        console.log('汪汪汪');
    }
  }

  const dog = new Dog('旺财');
  dog.sayHello();

})();