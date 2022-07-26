# 类型推断

这节介绍 TypeScript 里的类型推断。即，类型是在哪里如何被推断的。

## 基础

TypeScript 里，在有些没有明确指出类型的地方，类型推断会帮助提供类型。如下面的例子：

```typescript
let x = 3
```

变量 `x` 的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

大多数情况下，类型推断是直截了当地。后面的小节，我们会浏览类型推断时的细微差别。

## 最佳通用类型

有些时候我们需要从几个表达式中推断类型，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，

```typescript
let x = [0, 1, null]
```

为了推断 `x` 的类型，我们必须考虑所有元素的类型。 这里有两种选择：`number` 和 `null`。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。

由于最终的通用类型取自候选类型，有些时候候选类型共享一个公共结构，但是却没有一个类型能做为所有候选类型的超级类型。例如：

```typescript
class Animal {
  numLegs: number
}

class Bee extends Animal {
}

class Lion extends Animal {
}

let zoo = [new Bee(), new Lion()]
```
这里，我们想让 `zoo` 被推断为 `Animal[]` 类型，但是这个数组里没有对象是 `Animal` 类型的，因此不能推断出这个结果。 为了更正，我们可以明确的声明我们期望的类型：

```typescript
let zoo: Animal[] = [new Bee(), new Lion()]
```

如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，`(Bee | Lion)[]`

## 上下文类型

有些时候，TypeScript 类型推断会按另外一种方式，我们称作“上下文类型”；上下文类型的出现和表达式的类型以及所处的位置相关。比如：

```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.clickTime)  // Error
}
```

这个例子会得到一个类型错误，TypeScript 类型检查器使用 `window.onmousedown` 函数的类型来推断右边函数表达式的类型。 因此，就能推断出 `mouseEvent` 参数的类型了，所以 `mouseEvent` 访问了一个不存在的属性，就报错了。

如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。重写上面的例子：

```typescript
window.onmousedown = function(mouseEvent:any) {
  console.log(mouseEvent.clickTime)  // OK
}
```

这个函数表达式有明确的参数类型注解，上下文类型被忽略。这样的话就不报错了，因为这里不会使用到上下文类型。

上下文类型会在很多情况下使用到。通常包含函数的参数，赋值表达式的右边，类型断言，对象成员，数组字面量和返回值语句。上下文类型也会做为最佳通用类型的候选类型。比如：

```typescript
function createZoo(): Animal[] {
  return [new Bee(), new Lion()]
}

let zoo = createZoo()
```

这个例子里，最佳通用类型有 `3` 个候选者：`Animal`，`Bee` 和 `Lion`。 其中，`Animal` 会被做为最佳通用类型。
