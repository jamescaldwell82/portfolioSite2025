import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build for better SEO and performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    },
    // Enable source maps for better debugging
    sourcemap: false, // Disable in production for better performance
    // Minimize bundle size
    minify: 'esbuild', // Use esbuild instead of terser for better compatibility
    target: 'esnext',
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Optimize dev server
  server: {
    port: 5173
  },
  // SEO-friendly base URL
  base: '/'
})
