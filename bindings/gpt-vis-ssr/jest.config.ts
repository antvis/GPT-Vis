import type { Config } from 'jest';

const config: Config = {
  testTimeout: 60000,
  preset: 'ts-jest',
  collectCoverage: true,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  // Mock CSS/LESS/SVG files that Jest cannot parse from @antv/s2 dependencies
  // Note: @antv/s2-ssr's require.extensions approach doesn't work in Jest's module system
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

export default config;
