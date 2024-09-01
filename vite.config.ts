import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    dynamicImport({
      filter(id) {
        if (id.includes('./node_modules/tone')) {
          return true;
        }
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'rhizome',
        short_name: 'rhizome',
        description: 'An interactive art piece',
        theme_color: '#000000',
        icons: [
          {
            src: 'src/assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'src/assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
    react(),
  ],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
