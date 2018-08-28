/*
在MySQL的test数据库中创建一个pets表
use test;
create table pets (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;
*/

// $ sudo npm install sequelize mysql mysql2 --save-devls

// 使用Sequelize操作数据库的一般步骤就是：
// 1. 通过某个Model对象的findAll()方法获取实例
// 2. 如果要更新实例，先对实例属性赋新值，再调用save()方法
// 3. 如果要删除实例，直接调用destroy()方法
// 注意findAll()方法可以接收where、order这些参数，这和将要生成的SQL语句是对应的

const Sequelize = require('sequelize');
const config = require('./config');
// 创建sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
// 定义模型，映射数据库表
var Pet = sequelize.define('pet', { // 传入名称pet，默认表名是pets
    id: {                           // 指定列名和数据类型，如果是主键，需要更详细地指定
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false               // 额外的配置
});

/**
 * 插入数据
 */
// 用Promise方式
var now = Date.now();
Pet.create({
    id: 'g-' + now,
    name: 'csxiaoyao',
    gender: false,
    birth: '1993-11-28',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});

// await方式
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();

/**
 * 查询数据
 */
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'csxiaoyao'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
})();

/**
 * 更新数据
 */
// 对查询到的实例调用save()方法：
(async () => {
    var p = await queryFromSomewhere();
    p.gender = true;
    p.updatedAt = Date.now();
    p.version++;
    await p.save();
})();

/**
 * 删除数据
 */
// 对查询到的实例调用destroy()方法：
(async () => {
    var p = await queryFromSomewhere();
    await p.destroy();
})();