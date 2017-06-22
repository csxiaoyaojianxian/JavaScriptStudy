// 【 1 安装驱动 】
// $ cnpm install mysql

// 【 2 连接数据库 】
var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '19931128',
	port     : '3306', 
	database : 'test'
});
connection.connect();

// 数据库连接参数说明：
// host               主机地址 （默认：localhost）
// user               用户名
// password           密码
// port               端口号 （默认：3306）
// database           数据库名
// charset            连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
// localAddress       此IP用于TCP连接（可选）
// socketPath         连接到unix域路径，当使用 host 和 port 时会被忽略
// timezone           时区（默认：'local'）
// connectTimeout     连接超时（默认：不限制；单位：毫秒）
// stringifyObjects   是否序列化对象
// typeCast           是否将列值转化为本地JavaScript类型值 （默认：true）
// queryFormat        自定义query语句格式化方法
// supportBigNumbers  数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
// bigNumberStrings   supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
// dateStrings        强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
// debug              开启调试（默认：false）
// multipleStatements 是否许一个query中有多个MySQL语句 （默认：false）
// flags              用于修改连接标志
// ssl                使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件

// 【 3 数据库操作( CURD ) 】
// 查询数据
var sql = 'SELECT * FROM websites';
connection.query(sql,function (err, result) {
	if(err){
		console.log('[SELECT ERROR] - ',err.message);
		return;
	}
	console.log('\n------SELECT------');
	console.log(result);
});

// 插入数据
var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var addSqlParams = ['禅林阆苑', 'http://blog.csxiaoyao.com','10000', 'CN'];
connection.query(addSql,addSqlParams,function (err, result) {
	if(err){
		console.log('[INSERT ERROR] - ',err.message);
		return;
	}
	console.log('\n------INSERT------');
	console.log('INSERT ID:',result.insertId);
});

// 更新数据
var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['SUNSHINE STUDIO', 'https://www.csxiaoyao.com',6];
connection.query(modSql,modSqlParams,function (err, result) {
	if(err){
		console.log('[UPDATE ERROR] - ',err.message);
		return;
	}
	console.log('\n------UPDATE------');
	console.log('UPDATE affectedRows',result.affectedRows);
});

// 删除数据
var delSql = 'DELETE FROM websites where id=6';
connection.query(delSql,function (err, result) {
	if(err){
		console.log('[DELETE ERROR] - ',err.message);
		return;
	}
	console.log('\n------DELETE------');
	console.log('DELETE affectedRows',result.affectedRows);
});

connection.end();