// @ts-check
import globals from 'globals';
import { resolve } from 'path';
import process from 'process';
import { compat } from './utils.mjs';

const project = resolve(process.cwd(), 'tsconfig.json'); // これはこのままでもいい？

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  ...compat.extends('eslint-config-turbo'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        React: true,
        JSX: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    ignores: [
      // Ignore dotfiles
      '.*.js',
      'node_modules/',
      'dist/',
    ],
  },
];
