const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve('./src')],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              [
                '@babel/preset-stage-0',
                {
                  decoratorsLegacy: true,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              [
                'react-css-modules',
                {
                  generateScopedName: '[name]__[local]__[hash:base64:5]',
                  webpackHotModuleReloading: true,
                  filetypes: {
                    '.scss': {
                      syntax: 'postcss-scss',
                    },
                  },
                },
              ],
            ],
            env: {
              devlopment: {
                plugins: ['react-hot-loader/babel'],
              },
            },
          },
        },
        exclude: /node_modules/,
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
  stats: 'minimal',
}
