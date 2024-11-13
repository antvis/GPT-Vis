import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'],
  themeConfig: {
    name: 'GPT-Vis',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    footer: `Open-source MIT Licensed | Copyright © 2024
<br />
Powered by <a herf="https://antv.antgroup.com">Antv</a>`,
    socialLinks: {
      github: 'https://github.com/antvis/GPT-Vis',
    },
  },
  externals: {
    'mapbox-gl': 'window.mapboxgl',
    'maplibre-gl': 'window.maplibregl',
  },
  theme: {
    '@c-primary': '#691eff',
    '@s-content-width': '100%',
    '@s-content-padding': '48px',
    '@s-sidebar-width': '300px',
  },
});
