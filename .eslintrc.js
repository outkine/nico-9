const path = require('path')

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'standard'
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': 'off',
    'react/display-name': 'off'
  },
  plugins: ['standard', 'import', 'promise', 'react'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve('webpack.config.browser.js')
      }
    }
  }
}
