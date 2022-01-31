module.exports = {
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['airbnb-typescript', 'react-app', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-cycle': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};