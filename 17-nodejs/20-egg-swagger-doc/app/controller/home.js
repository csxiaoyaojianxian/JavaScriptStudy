const Controller = require('egg').Controller;

/**
 * @controller HomeController
 */
class HomeController extends Controller {
  /**
   * @router get /index  路径
   * @summary 接口的小标题信息
   * @description 接口的描述信息
   * @request query integer id 对参数id的描述
   * @request query string name 对参数name的描述
   * @response 200 indexJsonBody
   */
  async index () {
    this.ctx.body = {
      code: 0,
      message: '',
      data: {
        result: this.ctx.query.name || 'none'
      }
    }
  }
}

module.exports = HomeController;