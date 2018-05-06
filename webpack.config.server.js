const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}
