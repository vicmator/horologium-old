module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base'
  ],
  env: {
    es6: true,
    node: true
  },
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never'
    }]
  }
};
