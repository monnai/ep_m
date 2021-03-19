module.exports = {
  plugins: {
    // 'postcss-import': {},
    // 'postcss-url': {},
    autoprefixer: {
      // overrideBrowserslist: [
      //   'Android 4.1',
      //   'iOS 7.1',
      //   'Chrome > 31',
      //   'ff > 31',
      //   'ie >= 8'
      // ]
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 'postcss-pxtorem': {
    //   rootValue: 37.5,
    //   propList: ['*']
    // }
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      unitPrecision: 5,
      mediaQuery: true,
      // exclude: /(node_module)/i,
      selectorBlackList: ['html', 'mint-', 'mt-', 'mpvue-', 'calendar',
        'iconfont'],
      propBlackList: ['border']
    }
    // 'postcss-px2rem-exclude': {
    //   remUnit: 37.5
    //   // exclude: /node_modules|folder_name/i
    // }
  }
}
