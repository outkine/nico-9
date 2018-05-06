const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV,
  entry:
    process.env.NODE_ENV === 'development'
      ? [
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=/__webpack_hmr`,
        'webpack/hot/only-dev-server',
        './src/browser/index.js',
      ]
      : './src/browser/index.js',
  output: {
    path: path.resolve('dist/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins:
    process.env.NODE_ENV === 'development'
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      ]
      : [],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'app')],
    extensions: ['.js', '.jsx', '.json'],
  },
}
