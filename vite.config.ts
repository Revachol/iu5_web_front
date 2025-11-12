import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDocker = process.env.DOCKER === 'true';
const apiHost = isDocker ? 'http://host.docker.internal' : 'http://localhost';

export default defineConfig({
  plugins: [react()],
  base: '/iu5_web_front/',
  server: {
    proxy: {
      "/api": {
        target: apiHost,
        changeOrigin: true,
        // УБРАТЬ rewrite - бэкенд должен получать /api/anomalies
        // rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    watch: {
        usePolling: true,
    }, 
    host: true,
    strictPort: true,
    port: 3000,
  },
});