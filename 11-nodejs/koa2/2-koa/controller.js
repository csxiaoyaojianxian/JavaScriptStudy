/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-15 22:44:02 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-15 23:09:30
 */
const fs = require('fs');

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        var path = '';
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx"
            path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx"
            path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            // 如果url类似"PUT xxx"
            path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            // 如果url类似"DELETE xxx"
            path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            // 无效的URL
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    // 列出文件，只在启动时运行一次，不存在性能问题，可以用sync
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        // 过滤出.js文件
        return f.endsWith('.js');
    }).forEach((f) => {
        // 处理每个js文件，导入js文件
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};