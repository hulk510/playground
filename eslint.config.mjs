// @ts-check
import tseslint from 'typescript-eslint';

import { dirname, resolve } from 'path';
import process from 'process';

import { FlatCompat } from '@eslint/eslintrc';
import vercelReactEslint from '@vercel/style-guide/eslint/react';
import prettier from 'eslint-config-prettier';
import turbo from 'eslint-config-turbo';
import globals from 'globals';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const project = resolve(process.cwd(), 'tsconfig.json');

const ignores = [
  '**/.*.js',
  '**/node_modules/',
  '**/dist/',
  '**/.next/',
  '**/.astro/',
];

export default tseslint.config(
  {
    files: [
      'apps/**/*.js?(x)',
      'apps/**/*.ts?(x)',
      'packages/**/*.js?(x)',
      'packages/**/*.ts?(x)',
    ],
    name: 'ignore files',
    ignores,
  },
  // js.configs.recommended,
  // ...tseslint.configs.recommended,
  // {
  // ...compat.extends('eslint-config-turbo'), // MEMO: 何でか配列で返ってくる
  // {
  //   name: 'turbo',
  //   ...compat.extends(...turbo.extends), // この書き方だとエラーになる
  //   rules: {},
  // },
  {
    name: 'hoge',
    extends: [
      ...compat.extends(...turbo.extends),
      prettier,
      ...compat.extends(...vercelReactEslint.extends),
    ], // MEMO: 何でか配列で返ってくる

    settings: {
      ...vercelReactEslint.settings,
    },
    rules: {},
  },
  ...compat.config(vercelReactEslint).map((config) => ({
    ...config,
    name: '@vercel/style-guide/eslint/react',
    files: ['apps/docs/pages/**/*.ts?(x)', 'packages/**/*.ts?(x)'],
  })),
  {
    name: 'custom/typescript',
    files: [
      'apps/**/*.ts?(x)',
      // 'packages/**/*.ts?(x)',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    languageOptions: {
      parserOptions: {
        project: [
          // './tsconfig.eslint.json',
          './packages/*/tsconfig.json',
          './apps/*/tsconfig.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        React: true,
        JSX: true,
        ...globals.browser,
        ...globals.node,
      },
    },
  },
);
