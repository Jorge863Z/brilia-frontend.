import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 👈 CORREGIDO: Este es el nombre real
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})