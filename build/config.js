const vue = require('rollup-plugin-vue')
const path = require('path')
const babelrc = require('babelrc-rollup')
// const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')
const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ' * Vuikit v' + version + '\n' +
  ' * (c) 2016-present Miljan Aleksic\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  // ES
  'es': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.mjs'),
    format: 'es'
  },
  // CommonJS
  'cjs': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.common.js'),
    format: 'cjs'
  },
  // Browser
  'umd': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.js'),
    format: 'umd',
    env: 'development'
  },
  // production build (Browser)
  'umd-production': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.min.js'),
    format: 'umd',
    env: 'production'
  }
}

function genConfig (opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    banner: banner,
    moduleName: 'Vuikit',
    sourceMap: true,
    plugins: [
      nodeResolve({
        extensions: [ '.js', '.json', '.vue' ]
      }),
      alias(Object.assign({
        resolve: ['.jsx', '.js']
      }, require('./alias'), opts.alias)),
      commonjs(),
      vue(),
      // babel(babelrc.default())
      buble(babelrc.default())
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
