import { Service } from 'egg';

export default class DemoService extends Service {
  public async create(params) {
    this.ctx.logger.debug('debug info from service ---  %j', params);
    return params;
  }
}
