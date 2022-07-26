# 高级类型

## 交叉类型

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如，`Person & Loggable` 同时是 `Person` 和 `Loggable`。 就是说这个类型的对象同时拥有了这两种类型的成员。

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在 JavaScript 里发生这种情况的场合很多！） 下面是如何创建混入的一个简单例子：

```typescript
function extend<T, U> (first: T, second: U): T & U {
  let result = {} as T & U
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result
}

class Person {
  constructor (public name: string) {
  }
}

interface Loggable {
  log (): void
}

class ConsoleLogger implements Loggable {
  log () {
    // ...
  }
}

var jim = extend(new Person('Jim'), new ConsoleLogger())
var n = jim.name
jim.log()
```

## 联合类型

联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 `number` 或 `string` 类型的参数。 例如下面的函数：

```typescript
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('Hello world', 4) // returns "    Hello world"

```

`padLeft` 存在一个问题，`padding` 参数的类型指定成了 `any`。 这就是说我们可以传入一个既不是 `number` 也不是 `string` 类型的参数，但是 TypeScript 却不报错。

```typescript
let indentedString = padLeft('Hello world', true) // 编译阶段通过，运行时报错
```

为了解决这个问题，我们可以使用 联合类型做为 `padding` 的参数：

```typescript
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft('Hello world', true) // 编译阶段报错
```

联合类型表示一个值可以是几种类型之一。我们用竖线（`|`）分隔每个类型，所以 `number | string` 表示一个值可以是 `number` 或 `string`。

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

```typescript
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim()    // error
```

这里的联合类型可能有点复杂：如果一个值的类型是 `A | B`，我们能够确定的是它包含了 `A` 和 `B` 中共有的成员。这个例子里，`Fish` 具有一个 `swim` 方法，我们不能确定一个 `Bird | Fish` 类型的变量是否有 `swim`方法。 如果变量在运行时是 `Bird` 类型，那么调用 `pet.swim()` 就出错了。

## 类型保护

联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 `Fish` 或者是 `Bird` 时怎么办？ JavaScript 里常用来区分这 2 个可能值的方法是检查成员是否存在。如之前提及的，我们只能访问联合类型中共同拥有的成员。

```typescript
let pet = getSmallPet()

// 每一个成员访问都会报错
if (pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}
```

为了让这段代码工作，我们要使用类型断言：

```typescript
let pet = getSmallPet()

if ((pet as Fish).swim) {
  (pet as Fish).swim()
} else {
  (pet as Bird).fly()
}
```

### 用户自定义的类型保护

这里可以注意到我们不得不多次使用类型断言。如果我们一旦检查过类型，就能在之后的每个分支里清楚地知道 `pet` 的类型的话就好了。

TypeScript 里的*类型保护*机制让它成为了现实。 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个*类型谓词*：

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

在这个例子里，`pet is Fish` 就是类型谓词。谓词为 `parameterName is Type` 这种形式， `parameterName` 必须是来自于当前函数签名里的一个参数名。

每当使用一些变量调用 `isFish` 时，`TypeScript` 会将变量缩减为那个具体的类型。

```typescript
if (isFish(pet)) {
  pet.swim()
}
else {
  pet.fly()
}
```

注意 `TypeScript` 不仅知道在 `if` 分支里 `pet` 是 `Fish` 类型；它还清楚在 `else` 分支里，一定不是 Fish类型而是 `Bird` 类型。

### typeof 类型保护

现在我们回过头来看看怎么使用联合类型书写 `padLeft` 代码。我们可以像下面这样利用类型断言来写：

```typescript
function isNumber (x: any):x is string {
  return typeof x === 'number'
}

function isString (x: any): x is string {
  return typeof x === 'string'
}

function padLeft (value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
```

然而，你必须要定义一个函数来判断类型是否是原始类型，但这并不必要。其实我们不必将 `typeof x === 'number' `抽象成一个函数，因为 TypeScript 可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。


```typescript
function padLeft (value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
```

这些 `typeof` 类型保护只有两种形式能被识别：`typeof v === "typename"` 和 `typeof v !== "typename"`， `"typename"`必须是 `"number"`， `"string"`，`"boolean"` 或 `"symbol"`。 但是 TypeScript 并不会阻止你与其它字符串比较，只是 TypeScript 不会把那些表达式识别为类型保护。

### instanceof 类型保护

如果你已经阅读了 `typeof` 类型保护并且对 JavaScript 里的 `instanceof` 操作符熟悉的话，你可能已经猜到了这节要讲的内容。

`instanceof` 类型保护是通过构造函数来细化类型的一种方式。我们把之前的例子做一个小小的改造：

```typescript
class Bird {
  fly () {
    console.log('bird fly')
  }

  layEggs () {
    console.log('bird lay eggs')
  }
}

class Fish {
  swim () {
    console.log('fish swim')
  }

  layEggs () {
    console.log('fish lay eggs')
  }
}

function getRandomPet () {
  return Math.random() > 0.5 ? new Bird() : new Fish()
}

let pet = getRandomPet()

if (pet instanceof Bird) {
  pet.fly()
}
if (pet instanceof Fish) {
  pet.swim()
}
```

## 可以为 null 的类型

TypeScript 具有两种特殊的类型，`null` 和 `undefined`，它们分别具有值 `null` 和 `undefined`。我们在[基础类型](/chapter2/type)一节里已经做过简要说明。 默认情况下，类型检查器认为 `null` 与 `undefined` 可以赋值给任何类型。 `null` 与 `undefined` 是所有其它类型的一个有效值。 这也意味着，你阻止不了将它们赋值给其它类型，就算是你想要阻止这种情况也不行。`null`的发明者，Tony Hoare，称它为[价值亿万美金的错误](https://en.wikipedia.org/wiki/Null_pointer#History)。

`--strictNullChecks` 标记可以解决此错误：当你声明一个变量时，它不会自动地包含 `null` 或 `undefined`。 你可以使用联合类型明确的包含它们：

```typescript
let s = 'foo'
s = null // 错误, 'null'不能赋值给'string'
let sn: string | null = 'bar'
sn = null // 可以

sn = undefined // error, 'undefined'不能赋值给'string | null'
```

注意，按照 JavaScript 的语义，TypeScript 会把 `null` 和 `undefined` 区别对待。`string | null`，`string | undefined` 和 `string | undefined | null` 是不同的类型。

### 可选参数和可选属性

使用了 `--strictNullChecks`，可选参数会被自动地加上 `| undefined`:

```typescript
function f(x: number, y?: number) {
  return x + (y || 0)
}
f(1, 2)
f(1)
f(1, undefined)
f(1, null) // error, 'null' 不能赋值给 'number | undefined'
```

可选属性也会有同样的处理：

```typescript
class C {
  a: number
  b?: number
}
let c = new C()
c.a = 12
c.a = undefined // error, 'undefined' 不能赋值给 'number'
c.b = 13
c.b = undefined // ok
c.b = null // error, 'null' 不能赋值给 'number | undefined'
```

### 类型保护和类型断言

由于可以为 `null` 的类型能和其它类型定义为联合类型，那么你需要使用类型保护来去除 `null`。幸运地是这与在 `JavaScript` 里写的代码一致：

```typescript
function f(sn: string | null): string {
  if (sn === null) {
    return 'default'
  } else {
    return sn
  }
}
```

这里很明显地去除了 `null`，你也可以使用短路运算符：

```typescript
function f(sn: string | null): string {
  return sn || 'default'
}
```

如果编译器不能够去除 `null` 或 `undefined`，你可以使用类型断言手动去除。语法是添加 `!` 后缀： `identifier!` 从 `identifier` 的类型里去除了 `null` 和 `undefined`：

```typescript
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet // error, 'name' 可能为 null
  }
  name = name || 'Bob'
  return postfix('great')
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet // ok
  }
  name = name || 'Bob'
  return postfix('great')
}

broken(null)

```

本例使用了嵌套函数，因为编译器无法去除嵌套函数的 `null`（除非是立即调用的函数表达式）。因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。如果无法知道函数在哪里被调用，就无法知道调用时 `name` 的类型。

## 字符串字面量类型

字符串字面量类型允许你指定字符串必须具有的确切值。在实际应用中，字符串字面量类型可以与联合类型，类型保护很好的配合。通过结合使用这些特性，你可以实现类似枚举类型的字符串。

```typescript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
  animate (dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // error! 不能传入 null 或者 undefined.
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // error

```

你只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。

```
Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'
```

## 总结

那么到这里，我们的 TypeScript 常用语法学习就告一段落了，当然 TypeScript 还有其他的语法我们并没有讲，我们只是讲了 TypeScript 的一些常用语法，你们把这些知识学会已经足以开发一般的应用了。如果你在使用 TypeScript 开发项目中遇到了其他的 TypeScript 语法知识，你可以通过 TypeScript 的[官网文档](https://www.typescriptlang.org/docs/home.html)学习。因为学基础最好的方法还是去阅读它的官网文档，敲上面的小例子。其实我们课程的基础知识结构也是大部分参考了官网文档，要记住学习一门技术的基础官网文档永远是最好的第一手资料。

但是 TypeScript 的学习不能仅仅靠看官网文档，你还需要动手实践，在实践中你才能真正掌握 TypeScript。相信很多同学学习到这里已经迫不及待想要大展身手了，那么下面我们就开始把理论转换为实践，一起来用 TypeScript 重构 axios 吧！



