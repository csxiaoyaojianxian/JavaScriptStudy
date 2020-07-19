import { Controller } from 'egg';

export default class UserController extends Controller {
  // GET	/api/users?limit=5&offset=5 6~10
  public async index() {
    const { ctx } = this;
    const query = {
      limit: parseInt(ctx.query.limit) || 10,
      offset: parseInt(ctx.query.offset) || 0,
    };
    const data = await ctx.service.user.list(query);
    ctx.helper.rest({
      ...data, // { "count": 2, "rows": [{...}, {...}] }
    }, 'ok', 0);
  }

  // GET	/api/users/:id
  public async show() {
    const ctx = this.ctx;
    const data = await ctx.service.user.find(parseInt(ctx.params.id) || 0);
    ctx.helper.rest(data); // {...}
  }

  // POST	/api/users
  public async create() {
    const { ctx } = this;
    // 参数校验 `ctx.request.body` 未通过将抛出 status = 422 的异常
    // https://github.com/node-modules/parameter#rule
    const createRule = {
      name: 'string',
      age: 'int',
      gender: { type: 'enum', values: [ 'male', 'female', 'unknown' ], required: false },
      // createdAt: { type: 'datetime', required: false },
      // updatedAt: { type: 'datetime', required: false },
    };
    const body = ctx.request.body;
    ctx.validate(createRule, body);
    const data = await ctx.service.user.create(body);
    ctx.helper.rest(data); // {...}
    ctx.status = 201;
  }

  // PUT	/api/users/:id
  public async update() {
    const { ctx } = this;
    const id = parseInt(ctx.params.id) || 0;
    const updates = {
      name: ctx.request.body.name,
      age: ctx.request.body.age,
      gender: ctx.request.body.gender,
      // updatedAt: new Date(),
    };
    const updateRule = {
      name: { type: 'string', required: false },
      age: { type: 'int', required: false },
      gender: { type: 'enum', values: [ 'male', 'female', 'unknown' ], required: false },
    };
    ctx.validate(updateRule, updates);
    const data = await ctx.service.user.update({ id, updates });
    ctx.helper.rest(data); // {...}
  }

  // DELETE	/api/users/:id
  public async destroy() {
    const { ctx } = this;
    const id = parseInt(ctx.params.id) || 0;
    await ctx.service.user.del(id);
    ctx.helper.rest({ id });
  }
}
