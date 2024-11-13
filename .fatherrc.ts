import { defineConfig } from 'father';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

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
      chrome: 51,
    },
    externals: {
      lodash: '_',
      'lodash-es': '_',
      react: 'React',
      'mapbox-gl': {
        root: 'mapboxgl',
        commonjs: 'mapbox-gl',
        commonjs2: 'mapbox-gl',
        amd: 'mapbox-gl',
      },
      'maplibre-gl': {
        root: 'maplibregl',
        commonjs: 'maplibre-gl',
        commonjs2: 'maplibre-gl',
        amd: 'maplibre-gl',
      },
    },
    chainWebpack(memo) {
      // 关闭压缩方便调试，默认开启
      // memo.optimization.minimize(false);

      memo
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static', openAnalyzer: false }]);
      return memo;
    },
  },
});
