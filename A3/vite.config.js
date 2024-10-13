import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    hmr: {
      overlay: false,
    },
    proxy: {
      ['/v3/mail/send']: {
        target: 'https://api.sendgrid.com',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
