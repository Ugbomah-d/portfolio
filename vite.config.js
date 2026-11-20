import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from GitHub Pages at https://ugbomah-d.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
});
