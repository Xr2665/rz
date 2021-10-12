// 使用严格模式
'use strict'
// 导入node.js的path模块
const path = require('path')
// 导入系统的一些配置
const defaultSettings = require('./src/settings.js')
// resolve函数，目的是将相对路径变成绝对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 名称，默认设置里面的名称，如果没有就用 vue Admin Template
const name = defaultSettings.title || 'vue Admin Template' // 网页标题

// 读取环境变量里面的port 或者 package.json 里面port ，谁有就用谁，没有就用 9528
const port = process.env.port || process.env.npm_config_port || 9528 // 运行端口号

// vue-cli脚手架的配置信息
// 文档地址：https://cli.vuejs.org/config/
module.exports = {
  // 运行路径和打包之后的路径,默认就是 /
  publicPath: '/',
  // 打包之后输出的文件夹名称，默认为dist
  outputDir: 'dist',
  // 打包之后静态文件存储的目录名称，默认为空
  assetsDir: 'static',
  // 是否在保存的时候进行lint格式化
  lintOnSave: process.env.NODE_ENV === 'development',
  // 关闭不要打包之后的map文件
  productionSourceMap: false,
  // 运行服务器配置
  devServer: {
    // 端口号
    port: port,
    // 是否自动打开浏览器
    open: true,
    // 冲突处理
    overlay: {
      // 关闭警告
      warnings: false,
      // 打开错误提示
      errors: true
    }
    // 运行之前做的事情，运行之前加载 mock模拟数据
    // before: require('./mock/mock-server.js')
  },
  // 对象式配置webpack信息
  configureWebpack: {
    // name属性的意思配置网页的标题
    name: name,
    // 解析处理，碰到@符号就替换成src
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 函数是配置webpack信息
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
