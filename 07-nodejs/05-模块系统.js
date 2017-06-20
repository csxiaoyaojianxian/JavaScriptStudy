/**
 * Created by sunshine on 2017/6/21.
 */
// 一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的 C/C++ 扩展

// 【创建模块】
// exports 对象，公开模块接口
// require 对象，获取模块接口，即获取 exports 对象
// 【方式1】导出 exports 对象
// 获取 exports 对象
var hello = require('./05-hello');
hello.world(); // hello world
// 【方式2】导出目的对象
var Hello = require('./05-hello');
hello2 = new Hello();
hello2.setName('Sunshine');
hello2.sayHello(); // Hello Sunshine

// 【require方法接受4种模块】
// 1、http、fs、path等，原生模块
// 2、./mod或../mod，相对路径的文件模块
// 3、/pathtomodule/mod，绝对路径的文件模块
// 4、mod，非原生模块的文件模块

// 【require文件查找策略】
// 文件模块缓存 --> 原生模块缓存 --> （原生模块） --> 文件加载

// 在路径 Y 下执行 require(X) 语句执行顺序：
// 1. 如果 X 是内置模块
//    a. 返回内置模块
//    b. 停止执行
// 2. 如果 X 以 '/' 开头
//    a. 设置 Y 为文件根路径
// 3. 如果 X 以 './' 或 '/' or '../' 开头
//    a. LOAD_AS_FILE(Y + X)
//    b. LOAD_AS_DIRECTORY(Y + X)
// 4. LOAD_NODE_MODULES(X, dirname(Y))
// 5. 抛出异常 "not found"

// LOAD_AS_FILE(X)
// 1. 如果 X 是一个文件, 将 X 作为 JavaScript 文本载入并停止执行。
// 2. 如果 X.js 是一个文件, 将 X.js 作为 JavaScript 文本载入并停止执行。
// 3. 如果 X.json 是一个文件, 解析 X.json 为 JavaScript 对象并停止执行。
// 4. 如果 X.node 是一个文件, 将 X.node 作为二进制插件载入并停止执行。

// LOAD_INDEX(X)
// 1. 如果 X/index.js 是一个文件,  将 X/index.js 作为 JavaScript 文本载入并停止执行。
// 2. 如果 X/index.json 是一个文件, 解析 X/index.json 为 JavaScript 对象并停止执行。
// 3. 如果 X/index.node 是一个文件,  将 X/index.node 作为二进制插件载入并停止执行。

// LOAD_AS_DIRECTORY(X)
// 1. 如果 X/package.json 是一个文件,
//    a. 解析 X/package.json, 并查找 "main" 字段。
//    b. let M = X + (json main 字段)
//    c. LOAD_AS_FILE(M)
//    d. LOAD_INDEX(M)
// 2. LOAD_INDEX(X)

// LOAD_NODE_MODULES(X, START)
// 1. let DIRS=NODE_MODULES_PATHS(START)
// 2. for each DIR in DIRS:
//    a. LOAD_AS_FILE(DIR/X)
//    b. LOAD_AS_DIRECTORY(DIR/X)

// NODE_MODULES_PATHS(START)
// 1. let PARTS = path split(START)
// 2. let I = count of PARTS - 1
// 3. let DIRS = []
// 4. while I >= 0,
//    a. if PARTS[I] = "node_modules" CONTINUE
//    b. DIR = path join(PARTS[0 .. I] + "node_modules")
//    c. DIRS = DIRS + DIR
//    d. let I = I - 1
// 5. return DIRS