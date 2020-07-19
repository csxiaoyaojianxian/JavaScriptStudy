/**
 * 错误处理中间件
 */
export default () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const code = parseInt(err.code) || -1;
      const status = err.status || (code >= 0 ? 400 : 500);

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code,
        message: error,
      };
      switch (status) {
        // 参数校验未通过
        case 422:
          ctx.body.detail = err.errors;
          break;
        default:
          //
      }
      ctx.status = status;
    }

    // 404 单独处理
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        ctx.body = '<h1>Page Not Found</h1>';
      }
    }
  };
};
