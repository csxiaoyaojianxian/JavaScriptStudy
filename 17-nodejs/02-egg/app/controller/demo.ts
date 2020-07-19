import { Controller } from 'egg';

export default class DemoController extends Controller {

  // GET	/
  public async index() {
    const { ctx } = this;
    ctx.response.redirect('/public/test.html');
  }

  // GET	/api/demo
  public async testEnv() {
    const { ctx } = this;
    ctx.body = `<h1>${ctx.app.env}</h1>`; // local
    ctx.response.type = 'text/html';
    ctx.status = 200;
  }

  // GET	/api/demo/:id
  public async testThrowError() {
    const { app, ctx } = this;
    ctx.logger.debug('testThrowError with id: %j', ctx.params.id);
    ctx.throw({
      code: app.config.CODE.TEST_ERROR,
      message: '测试错误抛出',
    });
  }

  // POST	/api/demo
  public async testRedis() {
    const { app, ctx } = this;
    await app.redis.set('test', ctx.request.body.test);
    const data = await app.redis.get('test');
    ctx.helper.rest(data);
  }
}
