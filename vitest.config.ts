import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.spec.ts'],
    globals: true,
    environment: 'node',
  },
});
