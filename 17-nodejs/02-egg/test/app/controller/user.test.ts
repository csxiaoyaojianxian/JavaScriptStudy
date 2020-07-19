import { app } from 'egg-mock/bootstrap';
import assert = require('assert');

describe('test/app/service/user.test.js', () => {
  describe('GET /api/users', () => {
    it('should work', async () => {
      await app.factory.createMany('user', 3);
      const res = await app.httpRequest().get('/api/users?limit=2');
      assert(res.status === 200);
      assert(res.body.data.count === 3);
      assert(res.body.data.rows.length === 2);
      assert(res.body.data.rows[0].name);
      assert(res.body.data.rows[0].age);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const res = await app.httpRequest().get(`/api/users/${user.id}`);
      assert(res.status === 200);
      assert(res.body.data.age === user.age);
    });
  });

  describe('POST /api/users', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/users')
        .send({
          age: 10,
          name: 'name',
          gender: 'male'
        });
      assert(res.status === 201);
      assert(res.body.data.id);

      res = await app.httpRequest().get(`/api/users/${res.body.data.id}`);
      assert(res.status === 200);
      assert(res.body.data.name === 'name');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/users/${user.id}`);
      assert(res.status === 200);
    });
  });
});
