

module.exports = {
  roots: [
    'test'
  ],
  verbose: false,
  // testEnvironment: 'node',
  testEnvironment: 'jsdom',
  testRegex: 'test/(.*/)*.*test.js$',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^celia\\.(\\w+)/(.+)$': '<rootDir>/../$1/src/$2'
  }
};
