import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.demo.index);
  router.resources('demo', '/api/demo', controller.demo);
  router.resources('users', '/api/users', controller.user);
  router.resources('posts', '/api/posts', controller.post);
};
