const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const path = require('path')

// const resolve = dir => path.join(__dirname, '.', dir)

module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: true,
          parallel: true
        })
      )
    }
  },
  chainWebpack: config => {
    config.module
      // vue-template-compiler 去掉标签之间的空格
      // https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-template-compiler/README.md#%E9%80%89%E9%A1%B9
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })

    config.externals({
      vue: 'Vue'
    })
  }
}
