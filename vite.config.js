import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/signwriting-word-processor/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SignWriting Word Processor',
        short_name: 'SignWriter',
        description: 'Offline word processor for SignWriting',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/signwriting-word-processor/',
        start_url: '/signwriting-word-processor/',
        file_handlers: [
          {
            action: '/signwriting-word-processor/',
            accept: {
              'application/x-signwriting': ['.sgnw']
            }
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        navigateFallback: null
      }
    })
  ]
})
