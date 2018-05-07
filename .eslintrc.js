const path = require('path')

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'standard',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'react/display-name': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-confusing-arrow': 'off',
    'import/unambiguous': 'off',
    semi: ['error', 'never'],
    'import/newline-after-import': 'error',
    'import/no-unresolved': 'off',
    'quote-props': ['error', 'consistent-as-needed'],
    'no-return-assign': 'off',
    'react/prop-types': 'off',
  },
  plugins: ['standard', 'import', 'promise', 'react'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve('webpack.config.browser.js'),
      },
    },
  },
}
