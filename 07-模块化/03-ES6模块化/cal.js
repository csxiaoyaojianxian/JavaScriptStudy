var cal = {
    add:function(n1,n2){
        return n1 + n2;
    }
};

// 【commonjs导出】
// module.exports = cal;

// 【ES6导出】
// -- 默认导出
// 导入方式 import xxx from './cal.js'
export default cal;

// -- 声明式导出
// 导入方式 import {obj1,obj3} from './cal.js';
// 方式1
export var obj1 = '声明式导出1';
export var obj2 = '声明式导出2';
// 方式2
var obj3 = '声明式导出3';
export {obj3};