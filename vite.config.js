/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "/petbook-frontend/",
  server:{
    port:3000
  },
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
