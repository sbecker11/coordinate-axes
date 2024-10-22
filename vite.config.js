import { defineConfig } from 'vite';

export default defineConfig({
  base: '/coordinate-axes/', // Set the base URL for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Add any Rollup options here if needed
    }
  }
});