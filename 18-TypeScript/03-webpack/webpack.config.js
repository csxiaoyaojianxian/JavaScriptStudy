const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // 配置打包环境，webpack生成的最外层的立即执行函数不使用箭头函数
    environment: {
      arrowFunction: false,
    }
  },
  // 指定webpack打包使用的模块
  module: {
    rules: [
      {
        test: /\.ts$/,
        // use: 'ts-loader',
        use: [ // 从后向前执行
          // 'babel-loader',
          {
            loader: 'babel-loader',
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    targets: {
                      'chrome': 58, // 兼容到chrome58
                      'ie': 7
                    },

                    // 指定corejs的版本
                    corejs: 3,
                    // 使用corejs的方式 usage为按需加载
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader',
        ],
        exclude: /node_modules/
      }
    ]
  },
  // 配置插件
  plugins: [
    // 清空输出目录
    new CleanWebpackPlugin(),
    // 使用html模板
    new HTMLWebpackPlugin({
      // title: '自定义title',
      template: './src/index.html',
    }),
  ],
  // 设置引用模块(import时不写文件后缀能识别为模块)
  resolve: {
    extensions: ['.ts', '.js']
  }
};