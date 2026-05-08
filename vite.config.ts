import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      onwarn(warning, handler) {
        if (warning.code === 'EVAL' && warning.id?.includes('lottie-web')) return
        if (warning.code === 'PLUGIN_TIMINGS') return
        handler(warning)
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const normalized = id.replace(/\\/g, '/')
          const parts = normalized.split('node_modules/').pop()?.split('/')
          if (!parts) return undefined
          const pkg = parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]
          if (['react', 'react-dom', 'react-router', 'react-router-dom', 'scheduler'].includes(pkg)) {
            return 'react-vendor'
          }
          if (['radix-ui', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge', 'cmdk'].includes(pkg)) {
            return 'ui-vendor'
          }
          if (['@tanstack/react-query', '@tanstack/react-table', '@tanstack/query-core', '@tanstack/table-core'].includes(pkg)) {
            return 'query-vendor'
          }
          if (['react-hook-form', '@hookform/resolvers', 'zod'].includes(pkg)) {
            return 'form-vendor'
          }
          if (['lottie-react', 'lottie-web'].includes(pkg)) {
            return 'lottie-vendor'
          }
          return undefined
        },
      },
    },
  },
})
