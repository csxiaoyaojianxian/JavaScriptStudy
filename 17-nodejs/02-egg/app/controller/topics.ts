import { Controller } from 'egg';

// 定义创建接口的请求参数规则
// https://github.com/node-modules/parameter#rule
const createRule = {
  name: 'string',
  type: { type: 'enum', values: [ 'ask', 'share' ], required: false },
};

export default class TopicController extends Controller {
  // GET	/topics	topics
  public async index() {
    const { ctx } = this;
    ctx.body = ctx.app.env; // local
    ctx.response.type = 'application/json';
    ctx.status = 200;
  }

  // GET	/topics/new	new_topic
  public async new() {
    const { app, ctx } = this;
    ctx.throw({
      code: app.config.CODE.TEST_ERROR,
      message: '测试错误抛出',
    });
  }

  // POST	/topics	topics
  public async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const data = await ctx.service.topics.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.helper.rest({
      ...data
    }, 'ok', 0);
  }
  // GET	/topics/:id	topic
  public async show() {}
  // GET	/topics/:id/edit	edit_topic
  public async edit() {}
  // PUT	/topics/:id	topic
  public async update() {}
  // DELETE	/topics/:id	topic
  public async destroy() {}
}
