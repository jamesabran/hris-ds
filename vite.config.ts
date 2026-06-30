import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  // Set VITE_BASE=/design-system when embedding in the HRIS app
  base: process.env.VITE_BASE ?? '/',
})
