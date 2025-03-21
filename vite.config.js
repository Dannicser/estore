import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: process.env.NODE_ENV === 'production' ? '/estore' : '/',
  resolve: {
    alias: {
      '@': '/src' // Пример алиаса для путей
    }
  }
})
