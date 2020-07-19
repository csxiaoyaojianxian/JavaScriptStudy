import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 日志输出等级调整
  config.logger = {
    level: 'DEBUG', // 输出到文件级别
    consoleLevel: 'DEBUG', // 输出到console级别
  };

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  return {
    ...config,
  };
};
