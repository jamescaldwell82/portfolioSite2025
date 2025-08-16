import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React optimizations
      jsxRuntime: 'automatic'
    })
  ],
  build: {
    // Optimize build for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunk
          'react-vendor': ['react', 'react-dom'],
          // UI library chunk
          'mui-core': ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],
          // Firebase services
          'firebase-core': ['firebase/app'],
          'firebase-auth': ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'firebase-analytics': ['firebase/analytics'],
          // Router
          'router': ['react-router-dom'],
          // PDF generation (largest chunk)
          'pdf-utils': ['html2pdf.js', 'html2canvas']
        },
        // Optimize chunk file names for better caching
        chunkFileNames: () => {
          return `assets/[name]-[hash].js`;
        },
        entryFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
    // Disable source maps in production for better performance
    sourcemap: false,
    // Use esbuild for faster builds and smaller bundles
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 400,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsDir: 'assets'
  },
  // Optimize dev server
  server: {
    port: 5173,
    host: true
  },
  // SEO-friendly base URL
  base: '/',
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@emotion/react']
  },
  // Enable esbuild optimizations
  esbuild: {
    drop: ['console', 'debugger'],
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
})
