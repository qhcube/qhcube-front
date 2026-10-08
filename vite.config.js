import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    root: 'src',
    base: '/',
    publicDir: 'public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        assetsDir: 'assets',
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, 'src')
        }
    },
    server: {
        port: 8080
    }
})
