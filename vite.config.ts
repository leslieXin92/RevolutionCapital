import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 你的应用服务器地址
        changeOrigin: true, // 需要虚拟主机站点，这样我们就可以绕过同源策略
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径：移除路径中的 `/api`
      }
    }
  },
  build: {
    outDir: 'build'
  }
})
