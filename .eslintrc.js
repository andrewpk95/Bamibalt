const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'linebreak-style': 0,
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/lines-between-class-members': 0,
  },
  ignorePatterns: ['node_modules/**'],
};

module.exports = config;
