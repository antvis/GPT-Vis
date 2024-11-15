import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteExternalsPlugin({
      'mapbox-gl': 'mapboxgl',
      'maplibre-gl': 'maplibregl',
    }),
  ],
});
