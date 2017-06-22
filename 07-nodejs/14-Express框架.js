// 【 1 Express 框架核心特性 】
// 		可以设置中间件来响应 HTTP 请求
// 		定义了路由表用于执行不同的 HTTP 请求动作
// 		可以通过向模板传递参数来动态渲染 HTML 页面

// 【 2 安装 Express 】
// $ cnpm install express --save        # 安装 Express 并将其保存到依赖列表中
// $ cnpm install body-parser --save    # node.js 中间件，处理 JSON, Raw, Text 和 URL 编码的数据
// $ cnpm install cookie-parser --save  # Cookie 解析工具，通过 req.cookies 取cookie，并转成对象
// $ cnpm install multer --save         # node.js 中间件，处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据
// $ cnpm list express                  # 查看 express 版本号