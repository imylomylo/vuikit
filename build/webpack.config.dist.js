const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const version = require('../package.json').version
const banner = `/*!
 * VuikitDocs v${version}
 * (c) 2016-present Miljan Aleksic
 * Released under the MIT License.
 */`

const nodeEnv = process.env.NODE_ENV || 'production'

const commonConfig = () => webpackMerge(baseWebpackConfig, {
  entry: {
    'vuikit': './lib'
  },
  externals: {
    vue: 'vue'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    // // lodash optimizations
    // new LodashModuleReplacementPlugin({
    //   'collections': true
    // }),
    // add banner on top of each file
    new webpack.BannerPlugin({
      banner,
      raw: true,
      entryOnly: true
    }),
    // display better errors
    new FriendlyErrors()
  ]
})

module.exports = [
  // default
  webpackMerge(commonConfig(), {
    output: {
      path: 'distwp',
      filename: '[name].js',
      chunkFilename: '[id].js'
    }
  }),
  // minified
  webpackMerge(commonConfig(), {
    output: {
      path: 'distwp',
      filename: '[name].min.js',
      chunkFilename: '[id].js'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    ]
  }),
  // dist common
  webpackMerge(commonConfig(), {
    output: {
      path: 'distwp',
      filename: '[name].common.js',
      chunkFilename: '[id].common.js',
      library: 'Vuikit',
      libraryTarget: 'commonjs2'
    },
    devtool: false
  })
]
