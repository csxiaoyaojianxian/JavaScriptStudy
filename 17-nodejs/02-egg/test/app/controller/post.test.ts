import { app } from 'egg-mock/bootstrap';
import assert = require('assert');
import { expect } from 'chai';

describe('test/app/service/post.test.js', () => {
  describe('GET /api/posts', () => {
    it('should work', async () => {
      await app.factory.createMany('post', 3);
      const res = await app.httpRequest().get('/api/posts?limit=2');
      expect(res.status).to.be.equal(200);
      assert(res.body.data.count === 3);
      assert(res.body.data.rows.length === 2);
      assert(res.body.data.rows[0].title);
      assert(!res.body.data.rows[0].content);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should work', async () => {
      const post = await app.factory.create('post');
      const res = await app.httpRequest().get(`/api/posts/${post.id}`);
      assert(res.status === 200);
      assert(res.body.data.title === post.title);
      assert(res.body.data.content === post.content);
    });
  });

  describe('POST /api/posts', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/posts')
        .send({
          title: 'title',
          content: 'content',
          user_id: 1,
        });
      assert(res.status === 201);
      assert(res.body.data.id);

      res = await app.httpRequest().get(`/api/posts/${res.body.data.id}`);
      assert(res.status === 200);
      assert(res.body.data.title === 'title');
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should work', async () => {
      const post = await app.factory.create('post');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/posts/${post.id}`)
        .send({ user_id: post.user_id });
      assert(res.status === 200);
    });
  });
});
