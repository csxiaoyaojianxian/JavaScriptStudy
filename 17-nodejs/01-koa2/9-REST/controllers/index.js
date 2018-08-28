/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-19 11:11:28 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-19 11:12:44
 */
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            init:"success"
        };
    }
};