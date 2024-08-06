import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Onboarding IoT Wizard',
        short_name: 'IoTWizard',
        description: 'An onboarding application for IoT devices.',
        start_url: '/',
        display: 'standalone',
        background_color: '#d3d3d3',
        theme_color: '#d3d3d3',
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
      }
    })
  ]
});
