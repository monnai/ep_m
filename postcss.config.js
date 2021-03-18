module.exports = {
  plugins: {
    autoprefixer: {
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
    // 'postcss-px2rem-exclude': {
    //   remUnit: 37.5
    //   // exclude: /node_modules|folder_name/i
    // }
  }
}
