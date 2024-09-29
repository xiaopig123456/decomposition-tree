import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      // 注入全局主题变量
      scss: {
        additionalData: `@use "@/assets/styles/var.scss" as *;`,
      },
    },
  },
  server: {
    host:'localhost',
    open:true,
    proxy: {
      '/test': {
        target: 'http://localhost:81',
        changeOrigin: true,
      }
    }
  }
})
