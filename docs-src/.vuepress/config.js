const path = require('path')

const resolve = dir => path.join(__dirname, '..', '..', dir)

module.exports = {
  title: 'Json Tree',
  // base: '/json-tree/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@lib', resolve('dist'))

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
  }
}
