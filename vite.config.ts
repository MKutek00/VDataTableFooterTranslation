import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type UserConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config: UserConfig = {
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      vuetify({
        autoImport: true
      }),
      VueI18nPlugin({
        include: fileURLToPath(new URL('./src/locales/**', import.meta.url))
        //path.resolve(__dirname, './src/locales/**'),
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
    // base: command === 'build' ? process.env.VITE_MODULE_URL : '',
    // https://github.com/vitejs/vite/issues/12676
    // esbuild: {
    //   charset: 'ascii'
    // },
    // build: {
    //   // outDir: process.env.VITE_DIST_DIR,
    //   sourcemap: true,
    //   target: 'esnext',
    //   minify: 'esbuild'
    // }
  };

  return config;
});
