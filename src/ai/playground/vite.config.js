import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../'),
      '@ant-design/graphs': resolve(__dirname, './node_modules/@ant-design/graphs'),
      'preact': resolve(__dirname, './node_modules/preact'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ['@ant-design/graphs', 'preact'],
  },
});
