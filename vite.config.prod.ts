import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  mode: 'production',
  build: {
    sourcemap: true,
    outDir: path.resolve(__dirname, './dist'),
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096, // 4kb
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,
        ecma: 2020
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      input: path.resolve(__dirname, './src/main.tsx'),
      output: {
        entryFileNames: 'bundle.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') || id.includes('yup') || id.includes('formik')) {
              return 'vendor-form';
            }
            if (id.includes('react-icons')) {
              return 'vendor-ui';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux') || id.includes('@tanstack/react-query')) {
              return 'vendor-state';
            }
            if (id.includes('axios') || id.includes('papaparse') || id.includes('react-select')) {
              return 'vendor-utils';
            }
          }
        },
      },
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }],
        ]
      }
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      filter: /\.(js|css|html|svg)$/,
      threshold: 1024
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      uuid: 'uuid/dist/esm-browser/index.js',
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux'
    ],
    exclude: []
  }
})