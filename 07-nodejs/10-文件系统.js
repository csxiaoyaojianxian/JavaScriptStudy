
var fs = require("fs")

// 【 0 异步和同步】
// fs 模块中的方法均有异步和同步版本
// 异步方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)
// 推荐使用异步方法，性能更高，速度更快，没有阻塞
// 以下示例均为异步文件操作
// 0.1 异步读取
// fs.readFile('input.txt', function (err, data) {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log("异步读取: " + data.toString());
// });
// 0.2 同步读取
// var data = fs.readFileSync('input.txt');
// console.log("同步读取: " + data.toString());
// console.log("程序执行完毕");
// 同步读取: sunshine studio --CS逍遥剑仙
// 程序执行完毕
// 异步读取: sunshine studio --CS逍遥剑仙

// 【 1 打开文件】
// fs.open(path, flags[, mode], callback) // 异步
//   path - 文件的路径
//   flags - 文件打开的行为
//   mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)
//   callback - 回调函数，两个参数(err, fd)，fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
// flags 参数取值：
//   r    只读模式，如果文件不存在抛出异常
//   r+   读写模式，如果文件不存在抛出异常
//   rs   同步方式读
//   rs+  同步方式读写
//   w    只写模式，如果文件不存在则创建
//   wx   类似'w'，如果文件路径存在，则写入失败
//   w+   读写模式，如果文件不存在则创建
//   wx+  类似'w+'，如果文件路径存在，则读写失败
//   a    追加模式，如果文件不存在则创建
//   ax   类似'a'，如果文件路径存在，则追加失败
//   a+   读取追加模式，如果文件不存在则创建
//   ax+  类似'a+'，如果文件路径存在，则读取追加失败

// 【 2 获取文件信息】
// fs.stat(path, callback)
//   path - 文件路径
//   callback - 回调函数，两个参数(err, stats)，stats 是 fs.Stats 对象，可以通过 stats 类中的提供方法判断文件的相关属性
// stats 类中的方法：
//   stats.isFile()	            如果是文件返回 true，否则返回 false
//   stats.isDirectory()        如果是目录返回 true，否则返回 false
//   stats.isBlockDevice()      如果是块设备返回 true，否则返回 false
//   stats.isCharacterDevice()  如果是字符设备返回 true，否则返回 false
//   stats.isSymbolicLink()     如果是软链接返回 true，否则返回 false
//   stats.isFIFO()             如果是FIFO，返回true，否则返回 false，FIFO是UNIX中的一种特殊类型的命令管道
//   stats.isSocket()           如果是 Socket 返回 true，否则返回 false
console.log("准备打开文件");
fs.stat('input.txt', function (err, stats) {
	if (err) {
		return console.error(err);
	}
	console.log(stats);
	console.log("读取文件信息成功");
	// 检测文件类型
	console.log("是否为文件(isFile) ? " + stats.isFile());
	console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
// 准备打开文件
// Stats {
//   dev: 16777220,
//   mode: 33188,
//   nlink: 1,
//   uid: 501,
//   gid: 20,
//   rdev: 0,
//   blksize: 4096,
//   ino: 3723085,
//   size: 32,
//   blocks: 8,
//   atimeMs: 1498048252000,
//   mtimeMs: 1497976029000,
//   ctimeMs: 1497976029000,
//   birthtimeMs: 1497975898000,
//   atime: 2017-06-21T12:30:52.000Z,
//   mtime: 2017-06-20T16:27:09.000Z,
//   ctime: 2017-06-20T16:27:09.000Z,
//   birthtime: 2017-06-20T16:24:58.000Z }
// 读取文件信息成功
// 是否为文件(isFile) ? true
// 是否为目录(isDirectory) ? false

// 【 3 写入文件】
// fs.writeFile(file, data[, options], callback)
// 如果文件存在，该方法写入的内容会覆盖旧的文件内容
//   file - 文件名或文件描述符
//   data - 要写入文件的数据，可以是 String(字符串)或 Buffer(流)对象
//   options - 该参数是一个对象，包含 {encoding, mode, flag}，默认编码为 utf8，模式为 0666，flag 为 'w'
//   callback - 回调函数，只包含错误信息参数(err)，在写入失败时返回
console.log("准备写入文件");
fs.writeFile('input.txt', 'sunshine studio --CS逍遥剑仙',  function(err) {
	if (err) {
		return console.error(err);
	}
	console.log("数据写入成功");
});

// 【 4 读取文件】
// fs.read(fd, buffer, offset, length, position, callback)
// 该方法使用了文件描述符来读取文件
//   fd - 通过 fs.open() 方法返回的文件描述符
//   buffer - 数据写入的缓冲区
//   offset - 缓冲区写入的写入偏移量
//   length - 要从文件中读取的字节数
//   position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取
//   callback - 回调函数，三个参数(err, bytesRead, buffer)，err 错误信息，bytesRead 读取的字节数，buffer 缓冲区对象

// 【 5 关闭文件】
// fs.close(fd, callback)
//   fd - 通过 fs.open() 方法返回的文件描述符
//   callback - 回调函数，没有参数
var buf = new Buffer(1024);
console.log("准备打开文件");
fs.open('input.txt', 'r+', function(err, fd) {
	if (err) {
		return console.error(err);
	}
	console.log("文件打开成功");
	console.log("准备读取文件");
	fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
		if (err){
			console.log(err);
		}
		console.log(bytes + " 字节被读取");
		// 仅输出读取的字节
		if(bytes > 0){
			console.log(buf.slice(0, bytes).toString());
		}
		// 关闭文件
		fs.close(fd, function(err){
			if (err){
				console.log(err);
			} 
			console.log("文件关闭成功");
		});
	});
});
// 准备打开文件
// 文件打开成功
// 准备读取文件
// 32 字节被读取
// sunshine studio --CS逍遥剑仙
// 文件关闭成功

// 【 6 截取文件】
// fs.ftruncate(fd, len, callback)
//   fd - 通过 fs.open() 方法返回的文件描述符
//   len - 文件内容截取的长度
//   callback - 回调函数，没有参数
var buf = new Buffer(1024);
console.log("准备打开文件");
fs.open('input.txt', 'r+', function(err, fd) {
	if (err) {
		return console.error(err);
	}
	console.log("文件打开成功");
	console.log("截取10字节后的文件内容");
	// 截取文件
	fs.ftruncate(fd, 10, function(err){
		if (err){
			console.log(err);
		} 
		console.log("文件截取成功");
		console.log("读取相同的文件"); 
		fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
			if (err){
				console.log(err);
			}
			// 仅输出读取的字节
			if(bytes > 0){
				console.log(buf.slice(0, bytes).toString());
			}
			// 关闭文件
			fs.close(fd, function(err){
				if (err){
					console.log(err);
				} 
				console.log("文件关闭成功");
			});
		});
	});
});
// 准备打开文件
// 文件打开成功
// 截取10字节后的文件内容
// 文件截取成功
// 读取相同的文件
// sunshine s
// 文件关闭成功

// 【 7 删除文件】
// fs.unlink(path, callback)
//   path - 文件路径
//   callback - 回调函数，没有参数
console.log("准备删除文件");
fs.unlink('input.txt', function(err) {
	if (err) {
		return console.error(err);
	}
	console.log("文件删除成功");
});

// 【 8 创建目录】
// fs.mkdir(path[, mode], callback)
//   path - 文件路径
//   mode - 设置目录权限，默认为 0777
//   callback - 回调函数，没有参数

// 【 9 读取目录】
// fs.readdir(path, callback)
//   path - 文件路径
//   callback - 回调函数，两个参数(err, files)，err 错误信息，files 目录下的文件数组列表

// 【 10 删除目录】
// fs.rmdir(path, callback)
//   path - 文件路径
//   callback - 回调函数，没有参数
console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test/",function(err){
	if (err) {
		return console.error(err);
	}
	console.log("目录创建成功");
});
console.log("准备删除目录 /tmp/test");
fs.rmdir("/tmp/test",function(err){
	if (err) {
		return console.error(err);
	}
	console.log("读取 /tmp 目录");
	fs.readdir("/tmp/",function(err, files){
		if (err) {
			return console.error(err);
		}
		files.forEach( function (file){
			console.log( file );
		});
	});
});
// 创建目录 /tmp/test/
// 准备删除目录 /tmp/test
// 目录创建成功
// 读取 /tmp 目录

// 【文件模块方法参考手册】
// fs.rename(oldPath, newPath, callback)                      异步 rename()     回调函数没有参数，但可能抛出异常
// fs.ftruncate(fd, len, callback)                            异步 ftruncate()  回调函数没有参数，但可能抛出异常
// fs.ftruncateSync(fd, len)                                  同步 ftruncate()
// fs.truncate(path, len, callback)                           异步 truncate()   回调函数没有参数，但可能抛出异常
// fs.truncateSync(path, len)                                 同步 truncate()
// fs.chown(path, uid, gid, callback)                         异步 chown()      回调函数没有参数，但可能抛出异常
// fs.chownSync(path, uid, gid)                               同步 chown()
// fs.fchown(fd, uid, gid, callback)                          异步 fchown()     回调函数没有参数，但可能抛出异常
// fs.fchownSync(fd, uid, gid)                                同步 fchown()
// fs.lchown(path, uid, gid, callback)                        异步 lchown()     回调函数没有参数，但可能抛出异常
// fs.lchownSync(path, uid, gid)                              同步 lchown()
// fs.chmod(path, mode, callback)                             异步 chmod()      回调函数没有参数，但可能抛出异常
// fs.chmodSync(path, mode)                                   同步 chmod()
// fs.fchmod(fd, mode, callback)                              异步 fchmod()     回调函数没有参数，但可能抛出异常
// fs.fchmodSync(fd, mode)                                    同步 fchmod()
// fs.lchmod(path, mode, callback)                            异步 lchmod()     回调函数没有参数，但可能抛出异常。Only available on Mac OS X
// fs.lchmodSync(path, mode)                                  同步 lchmod()
// fs.stat(path, callback)                                    异步 stat()       回调函数有两个参数 err, stats，stats 是 fs.Stats 对象
// fs.lstat(path, callback)                                   异步 lstat()      回调函数有两个参数 err, stats，stats 是 fs.Stats 对象
// fs.fstat(fd, callback)                                     异步 fstat()      回调函数有两个参数 err, stats，stats 是 fs.Stats 对象
// fs.statSync(path)                                          同步 stat()       返回 fs.Stats 的实例
// fs.lstatSync(path)                                         同步 lstat()      返回 fs.Stats 的实例
// fs.fstatSync(fd)                                           同步 fstat()      返回 fs.Stats 的实例
// fs.link(srcpath, dstpath, callback)                        异步 link()       回调函数没有参数，但可能抛出异常
// fs.linkSync(srcpath, dstpath)                              同步 link()
// fs.symlink(srcpath, dstpath[, type], callback)             异步 symlink()    回调函数没有参数，但可能抛出异常。type 参数可以设置为 'dir', 'file', 或 'junction' (默认为 'file') 
// fs.symlinkSync(srcpath, dstpath[, type])                   同步 symlink()
// fs.readlink(path, callback)                                异步 readlink()   回调函数有两个参数 err, linkString
// fs.realpath(path[, cache], callback)                       异步 realpath()   回调函数有两个参数 err, resolvedPath
// fs.realpathSync(path[, cache])                             同步 realpath()   返回绝对路径
// fs.unlink(path, callback)                                  异步 unlink()     回调函数没有参数，但可能抛出异常
// fs.unlinkSync(path)                                        同步 unlink()
// fs.rmdir(path, callback)                                   异步 rmdir()      回调函数没有参数，但可能抛出异常
// fs.rmdirSync(path)                                         同步 rmdir()
// fs.mkdir(path[, mode], callback)                           异步 mkdir(2)     回调函数没有参数，但可能抛出异常。 mode defaults to 0777
// fs.mkdirSync(path[, mode])                                 同步 mkdir()
// fs.readdir(path, callback)                                 异步 readdir(3)   读取目录的内容。
// fs.readdirSync(path)                                       同步 readdir()    返回文件数组列表。
// fs.close(fd, callback)                                     异步 close()      回调函数没有参数，但可能抛出异常。
// fs.closeSync(fd)                                           同步 close()
// fs.open(path, flags[, mode], callback)                     异步打开文件
// fs.openSync(path, flags[, mode])                           同步 version of fs.open()
// fs.utimes(path, atime, mtime, callback)            
// fs.utimesSync(path, atime, mtime)                          修改文件时间戳，文件通过指定的文件路径
// fs.futimes(fd, atime, mtime, callback)            
// fs.futimesSync(fd, atime, mtime)                           修改文件时间戳，通过文件描述符指定
// fs.fsync(fd, callback)                                     异步 fsync        回调函数没有参数，但可能抛出异常
// fs.fsyncSync(fd)                                           同步 fsync
// fs.write(fd, buffer, offset, length[, position], callback) 将缓冲区内容写入到通过文件描述符指定的文件
// fs.write(fd, data[, position[, encoding]], callback)       通过文件描述符 fd 写入文件内容
// fs.writeSync(fd, buffer, offset, length[, position])       同步版的 fs.write()
// fs.writeSync(fd, data[, position[, encoding]])             同步版的 fs.write()
// fs.read(fd, buffer, offset, length, position, callback)    通过文件描述符 fd 读取文件内容
// fs.readSync(fd, buffer, offset, length, position)          同步版的 fs.read
// fs.readFile(filename[, options], callback)                 异步读取文件内容
// fs.readFileSync(filename[, options])
// fs.writeFile(filename, data[, options], callback)          异步写入文件内容
// fs.writeFileSync(filename, data[, options])                同步版的 fs.writeFile
// fs.appendFile(filename, data[, options], callback)         异步追加文件内容
// fs.appendFileSync(filename, data[, options])               The 同步 version of fs.appendFile
// fs.watchFile(filename[, options], listener)                查看文件的修改
// fs.unwatchFile(filename[, listener])                       停止查看 filename 的修改
// fs.watch(filename[, options][, listener])                  查看 filename 的修改，filename 可以是文件或目录。返回 fs.FSWatcher 对象
// fs.exists(path, callback)                                  检测给定的路径是否存在
// fs.existsSync(path)                                        同步版的 fs.exists
// fs.access(path[, mode], callback)                          测试指定路径用户权限
// fs.accessSync(path[, mode])                                同步版的 fs.access
// fs.createReadStream(path[, options])                       返回ReadStream 对象
// fs.createWriteStream(path[, options])                      返回 WriteStream 对象
// fs.symlink(srcpath, dstpath[, type], callback)             异步 symlink().回调函数没有参数，但可能抛出异常