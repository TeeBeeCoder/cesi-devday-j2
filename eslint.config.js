import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist/**', 'coverage/**', 'reports/**', 'playwright-report/**', 'test-results/**'] },
  {
    files: ['**/*.{js,jsx,mjs}'], ...js.configs.recommended,
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], eqeqeq: ['error', 'always'] },
  },
  {
    files: ['src/**/*.{js,jsx}'], plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'warn',
      'no-restricted-syntax': ['error', { selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']", message: 'Render the customer note as plain text. This project does not require HTML injection.' }],
    },
  },
];
