import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__',
  testMatch: /area\.(test|spec)\.(ts|tsx)$/,

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.2, // 设置图片对比的阈值
    },
  },
  timeout: 60 * 1000, // 每个测试的超时时间
  retries: 1, // 重试次数
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 增加超时时间
  },
});
