const pathTo = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
// const entry = {};
// const weexEntry = {};
const entry = {index:pathTo.resolve('src','entry.js?entry=true')};
const weexEntry = {index:pathTo.resolve('src','entry.js?entry=true')};

const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
const isWin = /^win/.test(process.platform);
let fileType = '';

/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /*
   * Plugin: UglifyJsPlugin
   * Description: UglifyJS plugin for webpack
   * See: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
   */
  new webpack.optimize.UglifyJsPlugin({
    minimize: true
  }),
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
    raw: true,
    exclude: 'Vue'
  })
];
// Config for compile jsbundle for web.
const webConfig = {
  context: pathTo.join(__dirname, ''),
  entry: entry,
  output: {
    path: pathTo.join(__dirname, 'dist'),
    filename: '[name].web.js'
  },
  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'source-map',
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0 
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules(?!(\/|\\).*(weex).*)/
    }, {
      test: /\.vue(\?[^?]+)?$/,
      use: [{
        loader: 'vue-loader',
        options: {
          compilerModules: [
            {
              postTransformNode: el => {
                el.staticStyle = `$processStyle(${el.staticStyle})`
                el.styleBinding = `$processStyle(${el.styleBinding})`
              }
            }
          ]
        }
      }]
    }]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins
};
// Config for compile jsbundle for native.
const weexConfig = {
  entry: weexEntry,
  output: {
    path: pathTo.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules(?!(\/|\\).*(weex).*)/
    }, {
      test: /\.vue(\?[^?]+)?$/,
      use: [{
        loader: 'weex-loader'
      }]
    }, {
      test: /\.we(\?[^?]+)?$/,
      use: [{
        loader: 'weex-loader'
      }]
    }]
  },
  /*
   * These options configure whether to polyfill or mock certain Node.js globals and modules. 
   * This allows code originally written for the Node.js environment to run in other environments like the browser.
   *
   * See: https://webpack.js.org/configuration/node/#node
   */
  node: {
    setImmediate: false
    // See "Other node core libraries" for additional options.
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins
};
// If The fileType is '.we', only need to use weexConfig for building. 
if (fileType === '.we') {
  module.exports = weexConfig;
} else {
  module.exports = [webConfig, weexConfig];
}
