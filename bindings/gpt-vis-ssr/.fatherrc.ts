import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/esm',
  },
  cjs: {
    output: 'dist/cjs',
  },
});
