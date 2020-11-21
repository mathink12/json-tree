const path = require('path')

const resolve = dir => path.join(__dirname, '..', '..', dir)

module.exports = {
  title: 'Json Tree',
  base: '/json-tree/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'GitHub', link: 'https://github.com/mathink12/json-tree' }
    ],
    sidebar: [
      '/',
      '/getting-started/',
      '/api/'
    ]
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
  },
  plugins: [
    // [
    //   '@vuepress/last-updated',
    //   {
    //     transformer: (timestamp, lang) =>
    //       format(timestamp, 'yyyy-MM-dd HH:mm:ss')
    //   }
    // ],
    ['@vuepress/back-to-top']
  ]
}
