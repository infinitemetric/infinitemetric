import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api-brevo': {
        target: 'https://api.brevo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-brevo/, ''),
      },
    },
  },
})
