
// $ npm install koa koa-bodyparser koa-router --save

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const rest = require('./rest');
const controller = require('./controller');

const app = new Koa();

// parse request body:
app.use(bodyParser());

// bind .rest() for ctx:
app.use(rest.restify());

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');