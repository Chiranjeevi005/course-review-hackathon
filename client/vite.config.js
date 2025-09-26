import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Use default port 5173
    strictPort: true, // Don't allow fallback to another port
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})