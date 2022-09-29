module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ['error', 'always'],
    'object-curly-spacing': 'off', //['error', 'never', { 'arraysInObjects': true, 'objectsInObjects': true }], //대괄호{} 간격 설정.
    'space-in-parens': 'off', ///['error', 'always'], //중괄호 간격값 - 인수값 지정시
    // 'max-len': [2, {
    //   "code": 220
    // }],
    'no-multiple-empty-lines': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'space-before-function-paren': 'off',
    'space-infix-ops': 'off',
    'keyword-spacing': 'off',
    'comma-dangle': 'off',
    'spaced-comment': 'off',
    'padded-blocks': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', //@ts-ignore 문법 사용 경고 무시.
    '@typescript-eslint/no-inferrable-types': 'off', // 초기값 할당에 대한 에러
    'key-spacing': 'off',
    'no-trailing-spaces': 'off',
    'space-before-blocks': 'off',
    'arrow-spacing': 'off',
    'no-multi-spaces': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'object-property-newline': 'off',
    'array-bracket-spacing': 'off',
    'comma-spacing':'off',
    'template-curly-spacing': 'off',
    'no-useless-escape':'off',
  }
};
