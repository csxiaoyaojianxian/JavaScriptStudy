
// 【 1 安装 mongodb 】
// Homebrew安装mongodb
// $ brew update
// $ brew install mongodb

// 【 2 安装驱动 】
// $ cnpm install mongodb

// 【 3 数据库操作( CURD ) 】
// 与 MySQL 不同，MongoDB 会自动创建数据库和集合，使用前不需要手动创建


// 连接数据库 csxiaoyao
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/csxiaoyao';

// 插入数据
// 插入两条数据
var insertData = function(db, callback) {  
	//连接到表 site
	var collection = db.collection('site');
	//插入数据
	var data = [{"name":"sunshine","url":"www.csxiaoyao.com"},{"name":"csxiaoyao","url":"blog.csxiaoyao.com"}];
	collection.insert(data, function(err, result) { 
		if(err){
			console.log('Error:'+ err);
			return;
		}     
		callback(result);
	});
}

// 查询数据
// 检索 name 为 "csxiaoyao" 的数据
var selectData = function(db, callback) {  
	//连接到表
	var collection = db.collection('site');
	//查询数据
	var whereStr = {"name":'csxiaoyao'};
	collection.find(whereStr).toArray(function(err, result) {
		if(err){
			console.log('Error:'+ err);
			return;
		}     
		callback(result);
	});
}

// 更新数据
// 将 name 为 "csxiaoyao" 的 url 改为 "https://www.csxiaoyao.com"
var updateData = function(db, callback) {  
	//连接到表  
	var collection = db.collection('site');
	//更新数据
	var whereStr = {"name":'csxiaoyao'};
	var updateStr = {$set: { "url" : "https://www.csxiaoyao.com" }};
	collection.update(whereStr, updateStr, function(err, result) {
		if(err){
			console.log('Error:'+ err);
			return;
		}     
		callback(result);
	});
}

// 删除数据
// 将 name 为 "csxiaoyao" 的数据删除
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/csxiaoyao';    
var delData = function(db, callback) {  
	//连接到表  
	var collection = db.collection('site');
	//删除数据
	var whereStr = {"name":'csxiaoyao'};
	collection.remove(whereStr, function(err, result) {
		if(err){
			console.log('Error:'+ err);
			return;
		}     
		callback(result);
	});
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
	console.log("连接成功");
	// // 插入数据
	insertData(db, function(result) {
		console.log(result);
		db.close();
	});
	// 查询数据
	selectData(db, function(result) {
		console.log(result);
		db.close();
	});
	// // 更新数据
	updateData(db, function(result) {
		console.log(result);
		db.close();
	});
	// 删除数据
	delData(db, function(result) {
		console.log(result);
		db.close();
	});
});