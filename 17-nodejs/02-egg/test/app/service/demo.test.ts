import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/demo.test.js', () => {
  let ctx: Context;
  const param = {
    data: 'test',
  };

  before(async () => {
    ctx = app.mockContext();
  });

  it('create', async () => {
    const result = await ctx.service.demo.create(param);
    assert(JSON.stringify(result) === JSON.stringify(param));
  });
});
