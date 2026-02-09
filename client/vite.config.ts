import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7173',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://127.0.0.1:7173',
        changeOrigin: true,
        secure: false,
      }
    },
    port: 7001,
    strictPort: true,
    host: true,
    allowedHosts: [
      'g2panda.com.tr',
      'www.g2panda.com.tr',
      'localhost',
      '.g2panda.com.tr'
    ]
  }
})
