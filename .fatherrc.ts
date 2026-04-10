import { defineConfig } from 'father';

// dev 模式下只构建 esm，加快构建速度
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  esm: {
    output: 'dist/esm',
  },
  // 非 dev 模式时，额外构建 cjs 和 umd
  ...(isDev
    ? {}
    : {
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
      }),
});
