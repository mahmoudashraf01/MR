import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// import dotenv from 'dotenv'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      }
    },
    base: '/',
    define: {
      // Provide an explicit app-level constant derived from an env var.
      __VITE_BASE_URL__: JSON.stringify(env.VITE_BASE_URL),
    },
  }
})