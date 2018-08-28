/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-15 22:44:02 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-15 23:12:00
 */


const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
// parse request body
app.use(bodyParser());
// add controllers
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');