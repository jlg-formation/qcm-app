import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/qcm-app/',
  define: {
    'import.meta.env.VITE_SECRET_KEY': JSON.stringify('truc-bidule-machin'),
  },
})
