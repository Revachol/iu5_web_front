import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Относительные пути для Tauri
  server: {
    port: 1420,
    strictPort: true,
    host: 'localhost',
    //https: false, // Отключаем HTTPS для Tauri
  },
  build: {
    target: ['chrome100', 'safari13'],
  },
})