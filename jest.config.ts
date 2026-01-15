import type { Config } from 'jest';

const esm = ['internmap', 'd3-*'].join('|');

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  // Mock CSS/LESS/SVG imports from @antv/s2 and other dependencies
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // Transform esm to cjs.
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${esm}))`,
    `<rootDir>/node_modules/.pnpm/(?!(${esm}))`,
  ],
};

export default config;
