const path = require('path')
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/production-sub-path/'
  //   : '/',
  publicPath: '/',
  filenameHashing:false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 80,
    https: false,
    hotOnly: false,
    
    // proxy: {
    //   // 配置跨域
    //   '/api': {
    //     target: 'https://ele-interface.herokuapp.com/api/',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    before: app => {}
  },
}