/**
 * @name: rest.js
 * @desc: restful middleware
 * @author: victorsun@tencent.com
 * @date: 2020.07.13
 */
import { IHelper } from 'egg';

export default {
  async rest(this: IHelper, data = {}, message = 'success', code = 0) {
    const { ctx } = this;
    ctx.response.type = 'application/json';
    ctx.response.body = {
      code,
      message,
      data,
    };
  },
};
