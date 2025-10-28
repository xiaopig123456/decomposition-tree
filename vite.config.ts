import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
    build: {
        outDir: 'lib',
        rollupOptions: {
            external: ['vue','leader-line-vue','filter-obj'],
            output: {
                globals: {
                    vue: 'Vue',
                    'leader-line-vue': 'leader-line-vue',
                    'filter-obj': 'filter-obj'
                }
            }
        },
        lib: {
            entry: 'package/index.ts',
            name: 'decomposition-tree',
            fileName:'index'
        }
    }
})
