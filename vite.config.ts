// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ required for custom domain (no subfolder)
  plugins: [react()],
});
