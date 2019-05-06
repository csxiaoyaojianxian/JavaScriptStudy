const get       = require('./util').get;
const http      = require('http');
const Koa       = require('koa');
const serve     = require('koa-static');
const Router    = require('koa-router');

const port = process.env.PORT || 8085;
const app = new Koa();
const router = new Router();

router.get('/movie', async (ctx, next) => {
    let query = ctx.request.query;
    let {q, fields} = query;
    let url = `https://api.douban.com/v2/movie/search?q=${q}&fields=${fields}&count=10`;
    let res = await get(url);
    ctx.response.body = res;
});

app.use(router.routes());
app.use(serve(__dirname + '/public'));
app.listen(port, () => {
    console.log(`listen on port: ${port}`);
});