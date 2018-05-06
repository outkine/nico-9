const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/server/index.js',
  target: 'node',
  // externals: [nodeExternals()],
  output: {
    path: path.resolve('functions'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
}
