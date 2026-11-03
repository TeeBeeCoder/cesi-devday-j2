export default [{
  files: ['src/**/*.jsx'],
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  rules: {
    'no-restricted-syntax': ['error', {
      selector: 'JSXOpeningElement[name.name="img"]:not(:has(JSXAttribute[name.name="alt"]))',
      message: 'Give this image an explicit alt attribute.',
    }],
  },
}];
