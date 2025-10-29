import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: './tsconfig.app.json',
            include: "./package",
            insertTypesEntry: true,
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    build: {
        outDir: 'lib',
        rollupOptions: {
            external: ['vue', 'leader-line-vue', 'filter-obj'],
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
            fileName: 'index'
        }
    }
})
