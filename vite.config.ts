import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/learning-claude/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'fonts/*.woff2'],
      manifest: {
        name: 'ClaudeLingo — Aprenda Claude jogando',
        short_name: 'ClaudeLingo',
        description:
          'Aprenda a usar Claude e Claude Code com lições curtas e gamificadas: 7 níveis, XP e streak diário. Em português, offline, de graça.',
        lang: 'pt-BR',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#1c1613',
        background_color: '#1c1613',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/learning-claude/index.html',
      },
    }),
  ],
})
