/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-19 22:11:48 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-19 22:12:57
 */

// sign in:

module.exports = {
    'GET /signin': async (ctx, next) => {
        console.log('GET /signin');
    },
    // Headers:
    //    Content-Type : application/json
    // Body:JSON
    // {
    //     "name": "sunshine"
    // }
    'POST /signin': async (ctx, next) => {
        console.log('POST /signin');
        let name = ctx.request.body.name || 'csxiaoyao';
        let user = {
            name: name
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        ctx.cookies.set('name', value);
        console.log(`Set cookie value: ${value}`);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};