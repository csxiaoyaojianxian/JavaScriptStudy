import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.demo.index);
  router.get('/api/demo', controller.demo.testEnv);
  router.get('/api/demo/:id', controller.demo.testThrowError);
  router.post('/api/demo', controller.demo.testRedis);
  // restful
  router.resources('users', '/api/users', controller.user);
  router.resources('posts', '/api/posts', controller.post);
};
