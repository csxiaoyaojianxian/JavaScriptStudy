import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.index.index);
  router.resources('topics', '/api/topics', app.controller.topics);
  router.get('*', controller.index.notFound);

};
