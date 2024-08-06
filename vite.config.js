import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Onboarding IoT Wizard',
        short_name: 'IoT-Wizard',
        description: 'An onboarding application for IoT devices.',
        start_url: '/',
        display: 'standalone',
        background_color: '#374151',
        theme_color: '#374151',
        icons: [
          {
            src: '/iotWizard.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/iotWizard.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/iotWizard.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/iotWizard.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    }
  }
});
