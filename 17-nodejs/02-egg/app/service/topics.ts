import { Service } from 'egg';

export default class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  public async create(params) {
    return params;
  }
}
