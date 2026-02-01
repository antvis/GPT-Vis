import preact from '@preact/preset-vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [preact()],
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
