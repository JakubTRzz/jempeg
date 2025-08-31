import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // 0.0.0.0 bind: LAN’dan erişim
    port: 5173,
    strictPort: true,
    // (opsiyonel) HMR adresini sabitlemek istersen:
    // hmr: { host: 'YOUR_LAN_IP', port: 5173 }
  }
})
