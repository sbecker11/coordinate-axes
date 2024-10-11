import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/coordinate-axes/', // Set the base URL for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'] // Added extensions for JS, JSX, TS, TSX, and Vue
  },
  esbuild: {
    jsxInject: `import React from 'react'` // Added JSX inject for React
  },
  plugins: [vue()] // Added Vite plugin for Vue
});