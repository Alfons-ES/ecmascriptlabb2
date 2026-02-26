import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: './index.html',
                bild: './bild.html',
                scss: './scss.html',
                animering: './animering.html',
                diagram: './diagram.html',
                karta: './karta.html'
            }
        }
    }
})