const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HTMLPlugin = require('html-webpack-plugin')

const config = merge(base, {
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'iview/dist/styles/iview.css'
    ]
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
            /node_modules/.test(module.context) &&
            !/\.css$/.test(module.request)
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.ProvidePlugin({
      $ : "jquery",
      jQuery : "jquery",
      "window.jQuery" : "jquery"
    }),
    new HTMLPlugin({
      template: 'src/index.template.html'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'beta') {
  config.plugins.push(
      new SWPrecachePlugin({
        cacheId: 'vue-hn',
        filename: 'service-worker.js',
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst'
          }
        ]
      })
  )
}

module.exports = config
