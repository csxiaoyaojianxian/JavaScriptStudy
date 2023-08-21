/**
 * public / private / protected
 * getter / setter
 */

(function() {

  class A {
    protected num: number;
    // 语法糖，在构造函数中定义属性，public age: number
    constructor(num: number, public age: number) {
      this.num = num;
      this.age = age;
    }
  }
  class B extends A {
    test() {
      console.log(this.num);
    }
  }
  const b = new B(777, 18);
  // b.num = 1;


  class Person {
    // 默认 public
    public age: number = 30;
    public readonly name: string = 'csxiaoyao';
    private _hobby: Array<string>;

    constructor(age: number) {
      this.age = age;
      this._hobby = [];
    }

    // getter / setter
    /*
    getHobby() {
      return this._hobby;
    }
    setHobby(hobby: Array<string>) {
      this._hobby = hobby;
    }
    */
    get hobby() {
      return this._hobby;
    }
    set hobby(hobby: Array<string>) {
      this._hobby = hobby;
    }
  }

  const per = new Person(18);
  // getter
  console.log(per.hobby);


})();