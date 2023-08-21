
/**
 * 定义函数或类时，不明确的类型可以使用泛型，在执行时确定类型
 * fn<T> 定义泛型T
 */
function fn<T>(a: T): T {
  return a;
}
// 泛型自动推断
fn(10);
// 指定泛型
fn<string>('hello');

// 定义多个泛型
function fn2<T, K>(a: T, b: K): T {
  console.log(b);
  return a;
}
fn2<number, string>(123, 'hello');

// 限制泛型范围
interface Inter {
  length: number;
}
function fn3<T extends Inter>(a: T): number {
  return a.length;
}
fn3({length:10});

// class
class MyClass<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
}
const mc = new MyClass<string>('csxiaoyao');