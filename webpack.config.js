const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve('./src')],
  },
  entry: process.env.HOT
    ? ['@babel/polyfill', 'react-hot-loader/patch', './src/index.js']
    : ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve('dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [new MiniCssExtractPlugin(), new MonacoWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.global\.scss$/,
        use: [
          process.env.HOT ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          process.env.HOT ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.raw.js$/,
        use: 'raw-loader',
      },
    ],
  },
  stats: 'minimal',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    stats: 'minimal',
    publicPath: '/assets/',
  },
}
