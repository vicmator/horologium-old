module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base'
  ],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'function-paren-newline': ['error', 'consistent'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false
    }]
  },
};
