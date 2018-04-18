
// $ npm install koa koa-bodyparser koa-router --save

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

// parse request body:
app.use(bodyParser());

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');