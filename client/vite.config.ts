import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // this does not apply in production
        target: 'http://localhost:8080', // connect to backend during development
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
