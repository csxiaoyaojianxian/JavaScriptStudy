exports.keys = 'csxiaoyao';

// egg-swagger-doc 配置信息
exports.swaggerdoc = {
  dirScanner: './app/controller', // 配置自动扫描的控制器路径
  apiInfo: {
    title: '接口文档', // 接口文档的标题
    description: 'swagger 测试接口文档', // 接口文档描述
    version: '1.0.0', // 接口文档版本
    termsOfService: 'http://swagger.io/terms/', // 服务条件
    contact: {
      email: 'sunjianfeng@csxiaoyao.com' // 联系方式
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
  },
  basePath: '/', // 配置基础路径
  schemes: ['http', 'https'], // 配置支持的协议
  consumes: ['application/json'], // 指定处理请求的提交内容类型 (Content-Type)，如 application/json、text/html
  produces: ['application/json'], // 指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回
  securityDefinitions: {}, // 配置接口安全授权方式
  enableSecurity: false, // 是否启用授权，默认 false
  // enableValidate: true, // 是否启用参数校验，默认 true
  routerMap: false, // 是否启用自动生成路由(实验功能)，默认 true
  enable: true   // 默认 true
}
