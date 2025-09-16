import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './env');

  const viteEnv = {
    VITE_API_URL: env.VITE_API_URL,
    VITE_PUBLIC_SERVER_PATH: env.VITE_PUBLIC_SERVER_PATH ?? '/'
  }

  return {
    plugins: [vue()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(viteEnv.VITE_API_URL),
      'import.meta.env.VITE_PUBLIC_SERVER_PATH': JSON.stringify(viteEnv.VITE_PUBLIC_SERVER_PATH),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});