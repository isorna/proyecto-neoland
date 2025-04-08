// @ts-check

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^classes/(.*)': '<rootDir>/src/js/classes/$1.js',
    '^decorators/(.*)': '<rootDir>/src/js/decorators/$1.js',
    '^utils/(.*)': '<rootDir>/src/js/utils/$1.js',
    '^lib/(.*)': '<rootDir>/src/js/lib/$1.js',
    '^store/(.*)': '<rootDir>/src/js/store/$1.js',
  }
}

export default config