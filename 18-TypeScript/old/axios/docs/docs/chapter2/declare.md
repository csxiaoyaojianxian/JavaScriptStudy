# 变量声明

`let` 和 `const` 是 JavaScript 里相对较新的变量声明方式。`let` 在很多方面与 `var` 是相似的，但是可以帮助大家避免在 JavaScript 里常见一些问题。`const` 是对 `let` 的一个增强，它能阻止对一个变量再次赋值。

因为 TypeScript 是 JavaScript 的超集，所以它本身就支持 `let` 和 `const`。 下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替 `var`。

 如果你已经对 `var` 声明的怪异之处了如指掌，那么你可以轻松地略过这节。

## var 声明

在 ES5 的时代，我们都是通过 `var` 关键字定义JavaScript 变量：

```javascript
var a = 10
```

大家都能理解，这里定义了一个名为 `a` 值为 `10` 的变量。

我们也可以在函数内部定义变量：

```javascript
function f() {
  var message = 'Hello World!'

  return message
}
```

并且我们也可以在其它函数内部访问相同的变量：

```javascript
function f() {
  var a = 10
  return function g() {
    var b = a + 1
    return b
  }
}

var g = f()
g() // returns 11
```

上面的例子是一个典型的闭包场景，`g` 可以获取到 `f` 函数里定义的 `a` 变量。 每当 `g` 被调用时，它都可以访问到 `f` 里的 `a` 变量。 即使当 `g` 在 `f` 已经执行完后才被调用，它仍然可以访问 `a`。

### 作用域规则

`var` 声明有些奇怪的作用域规则。 看下面的例子：

```javascript
function f(shouldInitialize) {
  if (shouldInitialize) {
    var x = 10
  }

  return x
}

f(true)  // returns '10'
f(false) // returns 'undefined'
```

有些同学可能要多看几遍这个例子。 变量 `x` 是定义在 `if` 语句里面，但是我们却可以在语句的外面访问它。 这是因为 `var` 声明的作用域是函数作用域，函数参数也使用函数作用域。

这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错：

```javascript
function sumMatrix(matrix) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  
  return sum
}
```

这里很容易看出一些问题，里层的 `for` 循环会覆盖变量 `i`，因为所有 `i` 都引用相同的函数作用域内的变量。 有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦。

### 捕获变量怪异之处

猜一下下面的代码会返回什么：

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}
```

答案是，`setTimeout` 会在若干毫秒的延时后执行一个函数（等待其它代码执行完毕）：

``` javascript
10
10
10
10
10
10
10
10
10
10
```

很多 JavaScript 程序员对这种行为已经很熟悉了，但如果你很不解也没有关系，因为你并不是一个人。 大多数人期望输出结果是这样：

```javascript
0
1
2
3
4
5
6
7
8
9
```

> 我们传给 `setTimeout` 的每一个函数表达式实际上都引用了相同作用域里的同一个 `i`。

让我们花点时间思考一下这是为什么。 `setTimeout` 在若干毫秒后执行一个函数，并且是在 `for` 循环结束后。`for` 循环结束后，`i` 的值为 `10`。 所以当函数被调用的时候，它会打印出 `10`。

一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 `i` 的值：

```javascript
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i)
    }, 100 * i)
  })(i)
}
```

这种奇怪的形式我们已经司空见惯了。 参数 `i` 会覆盖 `for` 循环里的 `i`，但是因为我们起了同样的名字，所以我们不用怎么改 `for` 循环体里的代码。

## let 声明

现在你已经知道了 `var` 存在一些问题，这恰好说明了为什么用 `let` 语句来声明变量。 除了名字不同外， `let` 与 `var` 的写法一致：

```javascript
let hello = 'Hello!'
```

主要的区别不在语法上，而是语义，我们接下来会深入研究。

### 块作用域

当用 `let` 声明一个变量，它使用的是块作用域。 不同于使用 `var` 声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或 `for` 循环之外是不能访问的。

```typescript
function f(input: boolean) {
  let a = 100

  if (input) {
    // OK: 仍然能访问到 a
    let b = a + 1
    return b
  }

  // Error: 'b' 在这里不存在
  return b
}
```

这里我们定义了 2 个变量 `a` 和 `b`。 `a` 的作用域是 `f` 函数体内，而 `b` 的作用域是 `if` 语句块里。

在 `catch` 语句里声明的变量也具有同样的作用域规则。

```typescript
try {
  throw 'Oh no!';
}
catch (e) {
  console.log('Catch it.')
}

// Error: 'e' 在这里不存在
console.log(e)
```

拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于*暂时性死区*。 它只是用来说明我们不能在 `let` 语句之前访问它们，幸运的是 `TypeScript` 可以告诉我们这些信息。

```typescript
a++ // TS2448: Block-scoped variable 'a' used before its declaration.
let a
```

注意一点，我们仍然可以在一个拥有块作用域变量被声明前获取它。 只是我们不能在变量声明前去调用那个函数。 如果生成代码目标为 ES2015，现代的运行时会抛出一个错误；然而，现今 TypeScript 是不会报错的。

```typescript
function foo() {
  // okay to capture 'a'
  return a
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo()

let a
```

关于*暂时性死区*的更多信息，查看这里 [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)。


### 重定义及屏蔽

我们提过使用 `var` 声明时，它不在乎你声明多少次；你只会得到 1 个。

```javascript
function f(x) {
  var x
  var x

  if (true) {
    var x
  }
}
```

在上面的例子里，所有 `x` 的声明实际上都引用一个相同的`x`，并且这是完全有效的代码，但这经常会成为 `bug` 的来源。幸运的是 `let` 的声明就不会这么宽松了。

```typescript
let x = 10
let x = 20 // 错误，不能在 1 个作用域里多次声明 x
```

并不是要求两个均是块级作用域的声明 TypeScript 才会给出一个错误的警告。

```typescript
function f(x) {
  let x = 100 // Error: 干扰参数声明
}

function g() {
  let x = 100
  var x = 100 // Error: 不能同时具有 x 的两个声明
}
```

并不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明。

```typescript
function f(condition, x) {
  if (condition) {
    let x = 100
    return x
  }

  return x
}

f(false, 0) // returns 0
f(true, 0)  // returns 100
```

在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 `let` 重写之前的 `sumMatrix` 函数。

```typescript
function sumMatrix(matrix: number[][]) {
  let sum = 0
  for (let i = 0; i < matrix.length; i++) {
    let currentRow = matrix[i]
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }

  return sum
}
```

这个版本的循环能得到正确的结果，因为内层循环的 `i` 可以屏蔽掉外层循环的 `i`。

通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好权衡一下。

### 块级作用域变量的获取

每次进入一个作用域时，`let` 会创建一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

回想一下前面 `setTimeout` 的例子，我们最后需要使用立即执行的函数表达式来获取每次 `for` 循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 这样做挺痛苦的，但是幸运的是，你不必在 `TypeScript` 里这样做了。

当 `let` 声明出现在循环体里时拥有完全不同的行为。不仅是在循环里引入了一个新的变量环境，而且针对每次迭代都会创建这样一个新作用域，这就相当于我们在使用立即执行的函数表达式时做的事。所以在 `setTimeout` 例子里我们仅使用 `let` 声明就可以了。

```typescript
for (let i = 0; i < 10 ; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}
```

会输出与预料一致的结果：

```javascript
0
1
2
3
4
5
6
7
8
9
```
## const 声明

`const` 声明是声明变量的另一种方式。

```typescript
const numLivesForCat = 9
```

它们与 `let` 声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 `let` 相同的作用域规则，但是不能对它们重新赋值。

这很好理解，它们引用的值是不可变的。

```typescript
const numLivesForCat = 9
const kitty = {
  name: 'Kitty',
  numLives: numLivesForCat
}

// Error
kitty = {
  name: 'Tommy',
  numLives: numLivesForCat
};

// OK
kitty.name = 'Jerry'
kitty.numLives--
```

除非你使用特殊的方法去避免，实际上 `const` 变量的内部状态是可修改的。 幸运的是，`TypeScript` 允许你将对象的成员设置成只读的。接口一章有详细说明。

## let vs. const

现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。与大多数泛泛的问题一样，答案是：依情况而定。

使用最小特权原则，所有变量除了你计划去修改的都应该使用 `const`。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。使用 `const` 也可以让我们更容易的推测数据的流动。

## 解构

### 解构数组

最简单的解构莫过于数组的解构赋值了：

```typescript
let input = [1, 2]
let [first, second] = input
console.log(first) // outputs 1
console.log(second) // outputs 2
```

这创建了 2 个命名变量 `first` 和 `second`。 相当于使用了索引，但更为方便：

```typescript
let first = input[0]
let second = input[1]
```

作用于函数参数：

```typescript
let input: [number, number] = [1, 2]

function f([first, second]: [number, number]) {
  console.log(first)
  console.log(second)
}

f(input)
```

你可以在数组里使用 `...` 语法创建剩余变量：

```typescript
let [first, ...rest] = [1, 2, 3, 4]
console.log(first) // outputs 1
console.log(rest) // outputs [ 2, 3, 4 ]
```

你也可以忽略你不关心的尾随元素：

```typescript
let [first] = [1, 2, 3, 4]
console.log(first) // outputs 1
```

或其它元素：

```typescript
let [, second, , fourth] = [1, 2, 3, 4]
```

### 对象解构

你也可以解构对象：

```typescript
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
}
let { a, b } = o

```

这通过 `o.a` 和 `o.b` 创建了 `a` 和 `b` 。 注意，如果你不需要 `c` 你可以忽略它。

你可以在对象里使用 `...` 语法创建剩余变量：

```typescript
let { a, ...passthrough } = o
let total = passthrough.b + passthrough.c.length
```

### 属性重命名

你也可以给属性以不同的名字：

```typescript
let { a: newName1, b: newName2 } = o
```

这里的语法开始变得混乱。 你可以将 `a: newName1` 读做 `"a 作为 newName1"`。 方向是从左到右，好像你写成了以下样子：

```typescript
let newName1 = o.a
let newName2 = o.b
```

令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型，仍然需要在其后写上完整的模式。

```typescript
let {a, b}: {a: string, b: number} = o
```

### 默认值

默认值可以让你在属性为 `undefined` 时使用缺省值：

```typescript
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject
}
```

现在，即使 `b` 为 `undefined` ， `keepWholeObject` 函数的变量 `wholeObject` 的属性 `a` 和 `b` 都会有值。

### 函数声明

解构也能用于函数声明。 看以下简单的情况：

```typescript
type C = { a: string, b?: number }
function f({ a, b }: C): void {
  // ...
}
```
但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。

```typescript
function f({ a = '', b = 0 } = {}): void {
  // ...
}
f()
```

> 上面的代码是一个类型推断的例子，将在后续章节介绍。

其次，你需要知道在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：

```typescript
function f({ a, b = 0 } = { a: '' }): void {
  // ...
}
f({ a: 'yes' }) // OK, 默认 b = 0
f() // OK, 默认 a: '', b = 0
f({}) // Error, 一旦传入参数则 a 是必须的
```

要小心使用解构。 从前面的例子可以看出，就算是最简单的解构表达式也是难以理解的。 尤其当存在深层嵌套解构的时候，就算这时没有堆叠在一起的重命名，默认值和类型注解，也是令人难以理解的。 解构表达式要尽量保持小而简单。

## 展开

```typescript
let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5]
```
这会令 `bothPlus` 的值为 `[0, 1, 2, 3, 4, 5]`。 展开操作创建了 `first` 和 `second的` 一份浅拷贝。 它们不会被展开操作所改变。

你还可以展开对象：

```typescript
let defaults = { food: 'spicy', price: '$10', ambiance: 'noisy' }
let search = { ...defaults, food: 'rich' }
```

search的值为 `{ food: 'rich', price: '$10', ambiance: 'noisy' }`。 对象的展开比数组的展开要复杂的多。像数组展开一样，它是从左至右进行处理，但结果仍为对象。这就意味着出现在展开对象后面的属性会覆盖前面的属性。因此，如果我们修改上面的例子，在结尾处进行展开的话：

```typescript
let defaults = { food: 'spicy', price: '$10', ambiance: 'noisy' }
let search = { food: 'rich', ...defaults }
```

那么，`defaults` 里的 `food` 属性会重写 `food: 'rich'`，在这里这并不是我们想要的结果。
