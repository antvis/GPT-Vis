import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/esm',
  },
  cjs: {
    output: 'dist/cjs',
  },
  // https://github.com/umijs/father/blob/master/docs/config.md#umd
  umd: {
    name: 'GPTVis',
    output: {
      path: 'dist/umd',
      filename: 'index.min.js',
    },
    platform: 'browser',
    targets: {
      chrome: 80,
    },
    externals: {},
    chainWebpack(memo) {
      // 关闭压缩方便调试，默认开启
      // memo.optimization.minimize(false);
      // memo
      //   .plugin('webpack-bundle-analyzer')
      //   .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static', openAnalyzer: false }]);
      return memo;
    },
  },
});
