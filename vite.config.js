import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import zip from 'rollup-plugin-zip'
import copy from 'rollup-plugin-copy'
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

  if (+process.env.VITE_APP_IS_CHROME) {
    console.log('prepare Chrome extension build')
    config.build = {
      outDir: './dist-chrome'
    }
    config.plugins.push(
      copy({
        targets: [
          {src: 'public-chrome/*', dest: 'dist-chrome'},
        ],
        verbose: true,
        hook: 'writeBundle'
      })
    )
    config.plugins.push(zip({
      dir: 'dist-chrome'
    }))
  }

  return defineConfig(config)
}
