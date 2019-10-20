/**
 * jest 匹配器
 * 见 test 文件
 */
function add (a, b) {
    return a + b;
}

function minus (a, b) {
    return a - b;
}

function multi (a, b) {
    return a * b;
}

module.exports = {
    add,
    minus,
    multi
}