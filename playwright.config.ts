import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__',
  testMatch: ['**/!(*version).spec.ts', '**/*.test.ts'],
  use: {
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
    },
  },
  timeout: 60 * 1000,
  retries: 1,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  //   webServer: {
  //   command: 'pnpm run dev',
  //   url: 'http://localhost:8000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
