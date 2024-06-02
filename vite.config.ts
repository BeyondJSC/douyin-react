import { UserConfig, defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default function({ mode }: { mode: string }): UserConfig {
  const env = loadEnv(mode, process.cwd(), 'VITE')

  return defineConfig({
    base: env.VITE_VUE_APP_BASE_PATH,
    plugins: [react()],
    resolve: {
      alias: [{ find: 'src', replacement: resolve(__dirname, 'src') }]
    }
  })
}