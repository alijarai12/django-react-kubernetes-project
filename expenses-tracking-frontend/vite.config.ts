import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',     // Allows access from outside the container
    port: 5173,          // Ensures it runs on the expected port inside container
    proxy: {
      '/api': {
        target: 'http://backend:8000',  // Fix: Ensure it points to the backend service
        changeOrigin: true,
      }
    },
    cors: true,  
    strictPort: true,
    origin: 'http://app.exptrackapp.local',
    allowedHosts: ['app.exptrackapp.local'],  // ✅ Explicitly allow your domain
  },

  base: '/',

  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
});
