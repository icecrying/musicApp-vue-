const webpack = require('webpack');

module.exports = {
  // 配置代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: false,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    // 引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  }
};
