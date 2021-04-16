module.exports = {
  plugins: {
    autoprefixer: {
    },
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      unitPrecision: 5,
      mediaQuery: true,
      selectorBlackList: ['html', 'mint-', 'mt-', 'mpvue-', 'calendar',
        'iconfont'],
      propBlackList: ['border']
    }
  }
}
