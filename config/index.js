module.exports = {
  build: {
    env: require('./prod.env')
  },
  dev: {
    env: require('./dev.env')
  },
  proxyTable: {
    '/api': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
