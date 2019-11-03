// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

/* eslint-disable import/no-extraneous-dependencies, global-require, arrow-body-style */
// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  // on('file:preprocessor', webpack({
  //  webpackOptions: require('@vue/cli-service/webpack.config'),
  //  watchOptions: {}
  // }))

  return Object.assign({}, config, {
    // baseUrl: "http://localhost:8080", // 测试域名
    fixturesFolder: 'tests/e2e/fixtures', // 存放模拟上传或读取的文件
    integrationFolder: 'tests/e2e/specs', // 测试用例文件夹
    screenshotsFolder: 'tests/e2e/screenshots', // 屏幕快照
    // videoRecording: true,
    videosFolder: 'tests/e2e/videos', // 录制后的文件夹
    supportFile: 'tests/e2e/support/index.js', // 配置自定义命令全局注入
    trashAssetsBeforeRuns: false, // 不自动清空截图
    viewportHeight: 768, // 测试浏览器视口高度
    viewportWidth: 1366 // 测试浏览器视口宽度
  })
}
