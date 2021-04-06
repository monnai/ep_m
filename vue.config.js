const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack (config) {
    // 排除icons目录中svg文件处理
    config.module.rule('svg')
      .exclude
      .add(resolve('src/assets/img/icons'))
      .end()
    // 设置svg-sprite-loader处理icons目录中的svg
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/img/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
  },
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        page: '@/page',
        static: resolve('public/static')
      }
    }
  },
  // 开发环境服务配置
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: '8080',
    https: false,
    // 跨域配置
    proxy: {
      '/api': {
        target: 'http://172.16.2.146:8083/test/mobileTerminal/',
        // target: 'http://172.16.2.146:8085/RDSYSEDUV8-8.5.0/mobileTerminal/',
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个api就可以
        }

      }
    }
  },
  // 基本路径
  publicPath: './',
  // 输出路径
  outputDir: 'dist',
  // 静态资源
  assetsDir: 'static',
  // html的输出路径
  indexPath: 'index.html'
}
