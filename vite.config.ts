import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Portfolio/', // substitua pelo nome real do seu repo
  plugins: [vue()],
})