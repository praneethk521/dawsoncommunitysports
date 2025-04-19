// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ Required for GitHub Pages with custom domain
  plugins: [react()],
  resolve: {
    alias: {
      // Useful if you plan to organize more folders like utils, assets, etc.
      '@': '/src'
    }
  }
});
