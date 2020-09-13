/**
 * created by csxiaoyao
 * 2018.09.15
 */
// vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            plugins:['syntax-dynamic-import']
          }
        }
      ]
    }
  }
}
