import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  mode: 'production',
  build: {
    sourcemap: true,
    outDir: path.resolve(__dirname, '../static/slippery-ui'),
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: false,
      },
    },
    rollupOptions: {
      input: path.resolve(__dirname, './src/main.tsx'),
      output: {
        entryFileNames: 'js/bundle_v2.js',
        chunkFileNames: 'js/chunks/[name]-[hash].js',
        assetFileNames: 'css/main.css',
        manualChunks(id) {
          // Split node_modules into a separate vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      uuid: 'uuid/dist/esm-browser/index.js',
    },
  },
  server: {
    hmr: {
      overlay: false,
    }
  },
});
