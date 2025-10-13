import type { Config } from 'jest';

const esm = ['internmap', 'd3-*'].join('|');

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  // Transform esm to cjs.
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${esm}))`,
    `<rootDir>/node_modules/.pnpm/(?!(${esm}))`,
  ],
};

export default config;
