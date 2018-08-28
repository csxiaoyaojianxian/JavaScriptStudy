/*
# 安装koa2
$ sudo npm install koa --save-dev
# 处理路由
$ sudo npm install koa-router --save-dev
# 解析post请求的body
$ sudo npm install koa-bodyparser --save-dev
*/

const Koa = require('koa');
// 注意require('koa-router')返回的是函数，最后的()是函数调用
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `
        <h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="csxiaoyao"></p>
            <p>Password: <input name="password" type="password" value="19931128"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'csxiaoyao' && password === '19931128') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1><p><a href="/">Try again</a></p>`;
    }
});

// koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');