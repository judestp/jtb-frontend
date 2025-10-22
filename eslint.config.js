import { fixupConfigRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import noTypeAssertion from 'eslint-plugin-no-type-assertion';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      '**/dist',
      '**/eslint.config.js',
      '**/vite.config.ts',
      '**/vitest.config.ts',
      '**/tailwind.config.js',
      '**/postcss.config.js',

      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      // 'plugin:react-hooks/recommended',
      // 'plugin:@typescript-eslint/strict-type-checked',
      // 'plugin:@typescript-eslint/stylistic-type-checked',
      // 'plugin:react/recommended',
      // 'plugin:jsx-a11y/recommended',
    ),
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
      // react: fixupPluginRules(react),
      // '@typescript-eslint': fixupPluginRules(typescriptEslint),
      // 'react-hooks': fixupPluginRules(reactHooks),
      // 'jsx-a11y': fixupPluginRules(jsxA11Y),
      'no-type-assertion': noTypeAssertion,
      // import: importPlugin, // Comment this out for Next.js since it's already imported in next/core-web-vitals
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: [
          './tsconfig.json',
          // './tsconfig.app.json', // Comment this out for Next.js
          // './tsconfig.node.json', // Comment this out for Next.js
        ],
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Ensures TypeScript types are always considered
        },
      },
    },

    rules: {
      'import/extensions': [
        'error',
        'ignorePackages', // Always require extensions in imports
        {
          ts: 'always', // Always require .ts extension for TypeScript files
          tsx: 'always', // Always require .tsx extension for React files
          index: 'never',
        },
      ],
      curly: ['error', 'all'],
      'no-type-assertion/no-type-assertion': 'error',
      'object-shorthand': ['error', 'always'],

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Enums are not allowed. Use object literals instead.',
        },
      ],

      'no-alert': ['error'],

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],

      'no-unused-vars': 'off', // Disable this base rule in favor of @typescript-eslint/no-unused-vars (recommended)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      'react/jsx-props-no-spreading': 'error',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-pascal-case': 'error',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'function',
          modifiers: ['exported'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
      ],
    },
  },
];
