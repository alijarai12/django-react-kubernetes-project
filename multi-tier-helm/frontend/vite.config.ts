import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',     // Allows access from outside the container
    port: 5173,
    strictPort: true,     // Ensures the port doesn't change if 5173 is occupied
    hmr: {
      host: "app.exptrackapp.local", // Needed for Hot Module Replacement
    },
    allowedHosts: ["app.exptrackapp.local"], // ✅ Allow requests from this hostname
  }
})