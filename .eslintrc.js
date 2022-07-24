
module.exports = {
  parser:'vue-eslint-parser',
  parserOptions: {
    parser:'@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'vue/multi-word-component-names':'off'
  },
};