import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], // Подключаем плагин Vue
  base: process.env.NODE_ENV === 'production' ? '/e-store/' : '/', // Указываем базовый путь
  build: {
    outDir: 'dist', // Папка для сборки
    assetsDir: 'assets', // Папка для статических файлов (CSS, изображения и т.д.)
    emptyOutDir: true // Очищать папку перед сборкой
  }
})
