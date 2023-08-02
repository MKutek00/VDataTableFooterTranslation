/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'new-cap': 'off',
    'no-invalid-this': 'off',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'no-debugger': 'off',
  }
}
