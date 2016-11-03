/* eslint-env node, jest */
/* eslint-disable func-names */
/* global process */

process.env.NODE_ENV = 'test';

module.exports = function (wallaby) {
    return {
        files: [
            { pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false },
            { pattern: 'src/**/*.test.js', ignore: true },
            { pattern: 'src/**/*.js' },
            { pattern: 'public/**/*.json' },
        ],

        tests: [
            { pattern: 'src/**/*.test.js' },
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel(),
            '**/*.jsx': wallaby.compilers.babel(),
        },

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',
    };
};
