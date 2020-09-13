/**
 * config default
 * csxiaoyao
 * 2020.07.19
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import CODE from './Code';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_csxiaoyao';

  // mysql
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    username: 'root',
    password: '19931128',
    timezone: '+08:00',
  };

  // redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  // 全局错误处理
  config.onerror = {
    all(err, ctx) {
      console.log(err);
      ctx.body = 'error';
      ctx.status = 500;
    },
    html(err, ctx) {
      console.log(err);
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      console.log(err);
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  };

  // body数据解析
  const bodyParser = {
    jsonLimit: '3mb',
    // ignore: '/api',
  };

  /**
   * 自定义中间件配置
   */
  config.middleware = [
    'robot',
    'errorHandler',
  ];
  const robot = {
    ua: [ /curl/i ],
  };
  const errorHandler = {
    match: '/api', // 只对 /api 前缀的 url 路径生效
  };

  return {
    ...config,
    CODE,
    bodyParser,
    robot,
    errorHandler,
  };
};
