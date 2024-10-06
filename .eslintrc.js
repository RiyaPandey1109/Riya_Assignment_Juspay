module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        // Modify rules here
        'no-console': 'warn',  // Example: treat console logs as warnings
        'semi': ['warn', 'always'], // Example: warn for missing semicolons
        // Other rules...
    },
};
