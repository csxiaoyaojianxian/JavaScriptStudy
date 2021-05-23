module.exports = app => {
  const { router, controller } = app;

  router.get('/index', controller.home.index);
};