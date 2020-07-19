import { Controller } from 'egg';

// 定义创建接口的请求参数规则
// https://github.com/node-modules/parameter#rule
const createRule = {
  name: 'string',
  type: { type: 'enum', values: [ 'ask', 'share' ], required: false },
};

export default class DemoController extends Controller {
  // GET	/demo
  public async index() {
    const { ctx } = this;
    ctx.logger.debug('test logger');
    ctx.body = `<h1>${ctx.app.env}</h1>`; // local
    ctx.response.type = 'text/html';
    ctx.status = 200;

    // ctx.app.redis.get()
    // client.on('connect', function () {
    //     // set 语法
    //     client.set('lubanH5makerTest', 'csxiaoyao', function (err, data) {
    //         console.log(1, data)
    //     })
    //     // get 语法
    //     client.get('lubanH5makerTest', function (err, data) {
    //         console.log(2, data)
    //     })
    // })
  }

  // GET	/demo/new
  public async new() {
    const { app, ctx } = this;
    ctx.throw({
      code: app.config.CODE.TEST_ERROR,
      message: '测试错误抛出',
    });
  }

  // POST	/demo
  public async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 demo
    const data = await ctx.service.demo.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.helper.rest({
      ...data,
    }, 'ok', 0);
  }
  // GET	/demo/:id
  public async show() {
    const { ctx } = this;
    ctx.logger.debug('fetch id: %j', ctx.params.id);
    console.log('test show');
  }
  // GET	/demo/:id/edit	edit_demo
  public async edit() {
    console.log('test edit');
  }
  // PUT	/demo/:id	demo
  public async update() {
    console.log('test update');
  }
  // DELETE	/demo/:id	demo
  public async destroy() {
    console.log('test destroy');
  }
}
