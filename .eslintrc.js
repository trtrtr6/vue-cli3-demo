module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'standard/no-callback-literal': 0
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/standard']
}
