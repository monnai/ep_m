module.exports = {
  runtimeCompiler: true,
  // todo pluginOptions
  // 路径别名
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        page: '@/page'
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
