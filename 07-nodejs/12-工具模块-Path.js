// 【 Path 模块 】
// 提供处理和转换文件路径的工具

var path = require("path");

/**
 * Path 方法
 */
// path.normalize(p)                   规范化路径，注意'..' 和 '.'
// path.join([path1][, path2][, ...])  连接路径，使用当前系统的路径分隔符，Unix"/" Windows"\"
// path.resolve([from ...], to)        将 to 参数解析为绝对路径
// path.isAbsolute(path)               判断是否是绝对路径
// path.relative(from, to)             相对路径转为绝对路径
// path.dirname(p)                     返回路径中代表文件夹的部分，同 Unix 的 dirname 命令类似
// path.basename(p[, ext])             返回路径中的最后一部分，同 Unix 命令 bashname 类似
// path.extname(p)                     返回路径中文件的后缀名，即路径中最后一个'.'之后的部分，如果一个路径中不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串
// path.parse(pathString)              返回路径字符串的对象
// path.format(pathObject)             从对象中返回路径字符串，和 path.parse 相反

/**
 * Path 属性
 */
// path.sep                            平台的文件路径分隔符，'\\'、'/'。
// path.delimiter                      平台的分隔符','、';'、':'
// path.posix                          提供上述 path 的方法，不过总是以 posix 兼容的方式交互
// path.win32                          提供上述 path 的方法，不过总是以 win32 兼容的方式交互

// 格式化路径
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));
// 连接路径
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// 转换为绝对路径
console.log('resolve : ' + path.resolve('main.js'));
// 路径中文件的后缀名
console.log('ext name : ' + path.extname('main.js'));

// normalization : /test/test1/2slashes/1slash
// joint path : /test/test1/2slashes/1slash
// resolve : /Users/sunshine/Workspace/JavaScriptStudy/07-nodejs/main.js
// ext name : .js