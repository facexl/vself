
module.exports = {
  parser:'vue-eslint-parser',
  parserOptions: {
    parser:'@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'indent': ['error', 2, { SwitchCase: 1 }], // error类型，缩进2个空格
    'vue/multi-word-component-names':'off'
  },
};