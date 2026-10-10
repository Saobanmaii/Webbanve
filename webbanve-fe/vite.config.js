import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin react: cho Vite hiểu cú pháp JSX trong file .jsx
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
