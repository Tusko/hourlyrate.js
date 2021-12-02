import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoZip from 'vite-plugin-auto-zip'
const path = require('path');

export default defineConfig({
  plugins: [vue(), AutoZip()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
})
