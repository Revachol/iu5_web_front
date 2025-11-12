import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';

const isDocker = process.env.DOCKER === 'true';
const apiHost = isDocker ? 'http://host.docker.internal' : 'http://localhost';

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest:{
        name: "History",
        short_name: "History",
        start_url: "/iu5_web_front/",
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#db4938",
        orientation: "portrait-primary",
        icons: [
          {
            src: "flask-icon-180.png",
            type: "image/png",
            sizes: "180x180",
            purpose: "any maskable"
          },
          {
            src: "flask-icon-512.png",
            type: "image/png",
            sizes: "512x512"
          },
          {
            src: "flask-icon-192.png",
            type: "image/png",
            sizes: "192x192"
          }
        ],
      }
    })
  ],
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
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    watch: {
        usePolling: true,
    }, 
    host: true,
    strictPort: true,
    port: 3000,
  },
});