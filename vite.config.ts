import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'site-public',
  server: {
    watch: {
      // These folders hold working images/materials/build output that other apps
      // (cloud sync, antivirus, editors) may lock, which crashes Vite's file
      // watcher with EBUSY. None of them are part of the app's HMR graph.
      ignored: [
        '**/tfa-images/**',
        '**/other-materials/**',
        '**/dist/**',
        '**/scripts/**',
      ],
    },
  },
})
