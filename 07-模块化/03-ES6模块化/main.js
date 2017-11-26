// 【commonjs引入cal对象】
// var cal = require('./cal.js');

// 【es6模块引入】
// 默认导入
import defaultObj from './cal.js';
// 声明式导入(按需加载)
import {obj2,obj3} from './cal.js';
console.log(defaultObj,obj2,obj4);
// 全体导入
import * as obj from './cal.js';
console.log(obj);

cal.add(1,2);