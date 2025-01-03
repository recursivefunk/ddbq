module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    jest: true,
  },
  plugins: ['node', 'promise', 'unicorn'],
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-console': 'off',
    'no-extend-native': 'error',
    'no-promise-executor-return': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'require-await': 'error',
    'spaced-comment': ['error', 'always'],
    eqeqeq: ['error', 'smart'],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],

    // node
    'node/no-missing-require': 'error',
    'node/no-unsupported-features/es-builtins': ['error', { version: '14' }],
    'node/no-unsupported-features/es-syntax': ['error', { version: '14' }],
    'node/no-unsupported-features/node-builtins': ['error', { version: '14' }],

    // promise
    'promise/valid-params': 'error',

    // unicorn
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/throw-new-error': 'error',
  },
};
