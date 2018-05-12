const path = require('path')
const baseConfig = require('./webpack.config')
// const nodeExternals = require('webpack-node-externals')

module.exports = Object.assign(baseConfig, {
  mode: process.env.NODE_ENV,
  entry: ['@babel/polyfill', './src/server/index.js'],
  target: 'node',
  // externals: [nodeExternals()],
  output: {
    path: path.resolve('functions'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
})
