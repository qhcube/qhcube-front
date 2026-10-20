import {defineConfig} from 'vite'
import {readFileSync} from 'fs'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

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
    },
    define: {
        '__APP_VERSION__': JSON.stringify(packageJson.version)
    }
})
