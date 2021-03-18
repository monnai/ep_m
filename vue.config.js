const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  // todo 全局sass公共样式，现在直接使用没装sass-loader和node-sass 安装报
  // visual studio 错误
  // css: {
  //   sass: {
  //     additionalData: '@import "~@/common/css/common.scss";'
  //   }
  // },
  // todo pluginOptions
  // 路径别名
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
        target: 'http://172.16.3.143:8083/test/mobileTerminal/',
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
