module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: "@typescript-eslint/parser",
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 0,
    'vue/multi-word-component-names': 0,
    'max-len': 0,
  },
};
