import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Changed back to default port
    strictPort: true, // Prevents trying another port if 5173 is in use
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