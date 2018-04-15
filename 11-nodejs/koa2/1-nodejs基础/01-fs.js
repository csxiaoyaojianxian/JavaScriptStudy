'use strict';

var fs = require('fs');

/**
 * 异步读文件
 */
fs.readFile('./testFile/sample.txt', 'utf-8', function (err, data) {
    if (err) {
        // 正常读取，err为null
        // 读取错误，err代表错误对象
        console.log(err);
    } else {
        // 正常读取，data为读取到的String
        // 读取错误，data为undefined
        console.log(data.length + ' bytes');
        console.log(data);
    }
});

// 当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）。
// Buffer对象可以和String作转换，例如，把一个Buffer对象转换成String：

// 二进制文件读取，不传编码，得到buffer
fs.readFile('./testFile/sample.txt', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.length + ' bytes');
        // buffer
        console.log(data);

        // Buffer -> String
        console.log('Buffer -> String');
        var text = data.toString('utf-8');
        console.log(text);

        // String -> Buffer
        console.log('String -> Buffer');
        var buf = Buffer.from(text, 'utf-8');
        console.log(buf);
    }
});

/** 
 * 同步读文件
 */
// 不接收回调函数，函数直接返回结果，需要用 try...catch 捕获异常
try {
    var data = fs.readFileSync('testFile/sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    console.log(err);
}

/**
 * 异步写文件
 */
// 传入数据为String，默认按UTF-8编码写入文本文件
// 传入数据为Buffer，写入二进制文件
var writeData = 'Hello, Node.js';
fs.writeFile('testFile/output.txt', writeData, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

/**
 * 同步写文件
 */
try {
    fs.writeFileSync('testFile/outputSync.txt', writeData);
    console.log('ok sync write.');
} catch (err) {
    console.log(err);
}

/**
 * 异步 stat
 */
// fs.stat() 返回Stat对象，获取文件大小、创建时间、等文件或目录的详细信息
fs.stat('testFile/sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

/**
 * 同步 stat
 */
try {
    var stat = fs.statSync('testFile/sample.txt');
    console.log(stat);
} catch (err) {
    console.log(err);
}