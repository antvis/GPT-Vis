import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
