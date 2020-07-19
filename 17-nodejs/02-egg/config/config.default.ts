import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_csxiaoyao';

  config.CODE = {
    SUCCESS: '0',
    TEST_ERROR: '-1',
    CURL_ERROR: '-1000',
    DATA_NOT_FOUND: '404',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    username: 'root',
    password: '19931128',
    timezone: '+08:00',
  };

  config.onerror = {
    all(err, ctx) {
      console.log(err);
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error';
      ctx.status = 500;
    },
    html(err, ctx) {
      console.log(err);
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      console.log(err);
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  };

  const bodyParser = {
    jsonLimit: '3mb',
    // ignore: '/api',
  };

  // add your egg config in here
  config.middleware = [
    'robot',
    'errorHandler',
  ];

  // robot's configurations
  const robot = {
    ua: [
      /curl/i,
      /Baiduspider/i,
    ],
  };

  // 只对 /api 前缀的 url 路径生效
  const errorHandler = {
    match: '/api',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    bodyParser,
    robot,
    errorHandler,
  };
};
