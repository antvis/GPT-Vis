// @ts-check

import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  // config ignores files, equal `.eslintignore`
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.cache/**',
      '**/.history/**',
      '**/.idea/**',
      './*.?*.ts',
      'bindings/**',

      // Files of the build
      'dist/*',
    ],
  },

  // extends configs
  eslint.configs.recommended,

  // basic config
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-unsafe-optional-chaining': 'warn',
      'no-constant-condition': 'off',
      'no-prototype-builtins': 'off',
      'no-case-declarations': 'off',
      'no-useless-catch': 'off',
      'prefer-rest-params': 'off',
    },
  },

  // ts files linting
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-loss-of-precision': 0,
      '@typescript-eslint/no-inferrable-types': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-duplicate-enum-values': 0,
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/no-empty-object-type': 0,
    },
  },

  // react tsx files linting
  {
    files: ['**/*.{tsx}'],
    ...reactPlugin.configs.recommended,
    ...reactHooks.configs.recommended,
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {},
  },

  //
  // test jest file linting
  //
  {
    files: ['test/**/*.spec.ts'],
    ...jestPlugin.configs['flat/recommended'],
    rules: {},
  },

  // after all eslint plugins configs to override, see https://github.com/prettier/eslint-config-prettier
  // @ts-ignore
  prettierConfig,
);
