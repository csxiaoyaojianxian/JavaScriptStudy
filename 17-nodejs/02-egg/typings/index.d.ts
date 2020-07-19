import 'egg';

declare module 'egg' {
  interface Application {
    redis: redis;
  }
  interface Application {
    model: model;
  }
  interface Application {
    Sequelize: Sequelize;
  }
}