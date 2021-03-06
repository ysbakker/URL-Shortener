module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['vue.config.js'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: false },
    ],
    'prettier/prettier': 'error',
  },
}
