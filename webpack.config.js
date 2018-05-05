const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve('./src/index'),
  output: {
    path: path.resolve('dist'),
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'assets/[hash].[ext]'
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'event0 portal'
    })
  ]
}
