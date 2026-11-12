import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Allow access from anywhere in dev
    port: 5176       // Dev server port
    // ❌ allowedHosts does not belong here
  },
  preview: {
    host: '0.0.0.0', // Allow access from anywhere in preview
    port: 5176,      // Preview server port
    allowedHosts: [
      'test.wonbridge.com',
      'dev.wonbridge.com',
      'preprod.wonbridge.com',
      'wonbridge.com'
    ], // ✅ allow all your environments
  },
})
