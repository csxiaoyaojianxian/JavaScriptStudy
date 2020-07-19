import { Controller } from 'egg';

export default class PostController extends Controller {
  // GET	/api/posts?limit=5&offset=5 6~10
  public async index() {
    const ctx = this.ctx;
    const query = {
      limit: parseInt(ctx.query.limit) || 10,
      offset: parseInt(ctx.query.offset) || 0,
    };
    const data = await ctx.service.post.list(query);
    ctx.helper.rest({
      ...data, // { "count": 2, "rows": [{...}, {...}] }
    });
  }

  // GET	/api/posts/:id
  public async show() {
    const ctx = this.ctx;
    const data = await ctx.service.post.find(parseInt(ctx.params.id) || 0);
    ctx.helper.rest(data); // {...}
  }

  // POST	/api/posts
  public async create() {
    const ctx = this.ctx;
    const createRule = {
      title: 'string',
      content: 'string',
      user_id: 'int',
    };
    const body = ctx.request.body;
    ctx.validate(createRule, body);
    const data = await ctx.service.post.create(body);
    ctx.helper.rest(data); // {...}
    ctx.status = 201;
  }

  // PUT	/api/posts/:id
  public async update() {
    const ctx = this.ctx;
    const id = parseInt(ctx.params.id) || 0;
    const updates = {
      user_id: ctx.request.body.user_id,
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    const updateRule = {
      user_id: { type: 'int', required: false },
      title: { type: 'string', required: false },
      content: { type: 'string', required: false },
    };
    ctx.validate(updateRule, updates);
    const data = await ctx.service.post.update({ id, user_id: updates.user_id, updates });
    ctx.helper.rest(data); // {...}
  }

  // DELETE	/api/posts/:id
  public async destroy() {
    const ctx = this.ctx;
    const id = parseInt(ctx.params.id) || 0;
    const user_id = parseInt(ctx.request.body.user_id);
    await ctx.service.post.destroy({ id, user_id });
    ctx.helper.rest({ id, user_id });
  }
}
