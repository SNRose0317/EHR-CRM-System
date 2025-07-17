import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@marek/ui-kit': path.resolve(__dirname, '../ui-kit/src'),
      '@marek/medication-builder': path.resolve(__dirname, '../medication-builder/src'),
      '@marek/shared': path.resolve(__dirname, '../shared/src'),
    }
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'medication-builder': ['@marek/medication-builder'],
          'ui-kit': ['@marek/ui-kit'],
          'shared': ['@marek/shared']
        }
      }
    }
  }
})