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
  }
}
