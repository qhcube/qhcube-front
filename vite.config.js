import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        {
            name: 'build-html',
            apply: 'build',
            transformIndexHtml: (html) => {
                return {
                    html,
                    tags: [
                        {
                            tag: 'script',
                            attrs: {
                                src: '/assets/juego.js',
                            },
                            injectTo: 'head',
                        },
                    ],
                };
            },
        },
    ],
    server: {
        port: 8080
    }
})
