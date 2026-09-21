import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Baut eine einzelne, selbststaendige JS-Datei (+ ggf. CSS), die sich beim
// Laden selbst in alle [data-shader-gradient]-Container der statischen
// HTML-Seiten mountet. Kein Hashing im Dateinamen, damit die <script>-Tags
// in den HTML-Seiten nicht bei jedem Build angepasst werden muessen.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../assets/shader-gradient',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'shader-gradient.js',
        chunkFileNames: 'shader-gradient-[name].js',
        assetFileNames: 'shader-gradient[extname]'
      }
    }
  }
})
