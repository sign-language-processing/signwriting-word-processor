import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { copyFileSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'

// Plugin to copy Stencil web component assets
const copyStencilAssets = () => ({
  name: 'copy-stencil-assets',
  closeBundle() {
    const src = 'node_modules/@sutton-signwriting/sgnw-components/dist/sgnw-components'
    const dest = 'dist/assets/sgnw-components'

    mkdirSync(dest, { recursive: true })

    const files = readdirSync(src)
    files.forEach(file => {
      copyFileSync(join(src, file), join(dest, file))
    })

    console.log('✓ Copied Stencil web component assets')
  }
})

// https://vite.dev/config/
export default defineConfig({
  base: '/signwriting-word-processor/',
  plugins: [
    react(),
    copyStencilAssets(),
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
  ],
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  optimizeDeps: {
    include: ['@sutton-signwriting/sgnw-components']
  }
})
