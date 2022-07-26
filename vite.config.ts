import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    AutoImport({
      imports: ['vue','vue-router'],
    }),
    Components({ 
      dts: true,
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
  ],
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'src'),
    },
    extensions:['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'vself',
      fileName: (format) => `vself.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

