import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { transform as esbuildTransform } from 'esbuild'

export default defineConfig({
  plugins: [
    {
      name: 'extensionless-jsx',
      enforce: 'pre',
      async transform(code, id) {
        const cleanId = id.split('?')[0]
        const inTargetDir = cleanId.includes('/Pages/') || cleanId.includes('/Components/')
        const hasExt = /\.[a-zA-Z0-9]+$/.test(cleanId)
        if (inTargetDir && !hasExt) {
          const result = await esbuildTransform(code, { loader: 'jsx', jsx: 'automatic' })
          return { code: result.code, map: result.map }
        }
        return null
      }
    },
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@/entities': path.resolve(__dirname, 'EntitiesRuntime'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/Components': path.resolve(__dirname, 'Components'),
      '@/Pages': path.resolve(__dirname, 'Pages'),
      '@/integrations': path.resolve(__dirname, 'integrations')
    }
  },
  server: {
    port: 5173
  }
})
