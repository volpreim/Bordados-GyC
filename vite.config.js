import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Bordados-GyC/', // <-- Esta línea es la clave para que encuentre tus archivos
  plugins: [react()]
})