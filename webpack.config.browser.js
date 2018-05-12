const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config')

module.exports = Object.assign(baseConfig, {
  mode: process.env.NODE_ENV,
  entry:
    process.env.NODE_ENV === 'development'
      ? [
          '@babel/polyfill',
          'react-hot-loader/patch',
          `webpack-hot-middleware/client?path=/__webpack_hmr`,
          'webpack/hot/only-dev-server',
          './src/browser/index.js',
        ]
      : ['@babel/polyfill', './src/browser/index.js'],
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins:
    process.env.NODE_ENV === 'development'
      ? [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]
      : [],
})
