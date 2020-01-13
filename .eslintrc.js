'use strict';

module.exports = {
    extends: ['eslint-config-rohan', 'prettier', 'prettier/@typescript-eslint'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        // Project-specific overrides.
        // The APIs currently return snake_cased fields.
        '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
        // For Angular forwardRef.
        '@typescript-eslint/no-use-before-define': ['error', { classes: false }],
        // This project is not fully-typed, and there is no `allowAny` option.
        '@typescript-eslint/restrict-plus-operands': 'off',

        '@typescript-eslint/interface-name-prefix': 'error',
        '@typescript-eslint/no-explicit-any': 'error'
    }
};
