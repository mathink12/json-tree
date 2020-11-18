const path = require('path')

const resolve = dir => path.join(__dirname, '..', '..', dir)

module.exports = {
  title: 'Json Tree',
  // base: '/json-tree/',
  markdown: {
    lineNumbers: true
  },
  // themeConfig: {},
  chainWebpack: config => {
    config.resolve.alias
      .set('@lib', resolve('dist'))
  }
}
