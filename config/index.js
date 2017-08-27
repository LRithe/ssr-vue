module.exports = {
  build: {
    env: process.env.NODE_ENV === 'production' ? require('./prod.env') : require('./beta.env')
  },
  dev: {
    env: require('./dev.env'),
    proxyTable: {
      '/api': {
        target: 'https://api.douban.com/v2/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
