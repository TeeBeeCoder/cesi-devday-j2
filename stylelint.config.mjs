export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'import-notation': 'string',
    'at-rule-no-unknown': [true, { ignoreAtRules: ['theme'] }],
    'at-rule-empty-line-before': null,
    'rule-empty-line-before': null,
  },
};
