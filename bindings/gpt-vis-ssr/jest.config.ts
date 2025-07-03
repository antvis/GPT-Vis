import type { Config } from 'jest';

const config: Config = {
  testTimeout: 60000,
  preset: 'ts-jest',
  collectCoverage: true,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};

export default config;
