import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    root: 'src',
    base: '/',
    publicDir: 'public',
    build: {
        outDir: '../dist',
        assetsDir: 'assets',
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        port: 8080
    }
})
