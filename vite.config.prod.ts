import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  mode: 'production', // Same as `mode: 'production'`
  build: {
    sourcemap: true, // Equivalent to `devtool: 'source-map'`
    outDir: path.resolve(__dirname, './dist'), // Output directory
    minify: 'terser', // Enable terser for JS minification
    cssMinify: true, // Enable CSS minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements
        drop_debugger: true // Remove debugger statements
      }
    },
    rollupOptions: {
      input: path.resolve(__dirname, './src/main.tsx'), // Entry file
      output: {
        entryFileNames: 'bundle_v2.js', // Output file name
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
})

