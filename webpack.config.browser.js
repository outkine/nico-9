const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.config')

module.exports = merge.smart(baseConfig, {
  entry: process.env.HOT
    ? [
        '@babel/polyfill',
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=/__webpack_hmr`,
        'webpack/hot/only-dev-server',
        './src/containers/ClientApp.js',
      ]
    : ['@babel/polyfill', './src/containers/ClientApp.js'],
  output: {
    path: path.resolve('public'),
    filename: 'client.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.HOT ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),

    ...(process.env.HOT
      ? [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.DefinePlugin({
            __isBrowser__: 'true',
          }),
        ]
      : []),
  ],
})
