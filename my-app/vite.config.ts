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
          mui: ['@mui/material', '@mui/icons-material', '@mui/system'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
          router: ['react-router-dom'],
          pdf: ['html2pdf.js']
        }
      }
    },
    // Disable source maps in production for better performance
    sourcemap: false,
    // Use esbuild for faster builds and smaller bundles
    minify: 'esbuild',
    target: 'es2015', // Better browser compatibility
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true
  },
  // Optimize dev server
  server: {
    port: 5173
  },
  // SEO-friendly base URL
  base: '/',
  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename) {
      return filename
    }
  }
})
