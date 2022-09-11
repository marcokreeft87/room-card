module.exports = {
    transform: {'^.+\\.ts?$': ['ts-jest', { "compiler": "ttypescript" } ]},
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: [ "<rootDir>/tests/config.ts" ]
};