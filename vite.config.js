import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoZip from 'vite-plugin-auto-zip'
const path = require('path');

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const config = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      },
    },
  };
  console.log(process.env.VITE_APP_IS_CHROME)
  if (+process.env.VITE_APP_IS_CHROME) {
    config.build = {
      outDir: './dist-chrome'
    }
    config.plugins.push(AutoZip('./dist-chrome'))
  }

  return defineConfig(config)
}
