module.exports = {
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json'],
        ecmaVersion: 12,
        sourceType: 'module',
        createDefaultProgram: true,
      },
      extends: ['airbnb-base', 'prettier', 'plugin:import/typescript'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': [2, { args: 'after-used', argsIgnorePattern: '^_' }],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error'],
        'prettier/prettier': 'error',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
      },
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': ['error', { code: 140 }],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './src/'],
        alwaysTryTypes: true,
      },
    },
  },
};
