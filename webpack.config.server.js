const path = require('path')
const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config')

module.exports = merge.smart(baseConfig, {
  entry: ['@babel/polyfill', './src/containers/ServerApp.js'],
  target: 'node',
  // externals: [nodeExternals()],
  output: {
    path: path.resolve('functions/build'),
    filename: 'server.bundle.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
})
