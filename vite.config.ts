import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Icons({ compiler: 'vue3' }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        IconsResolver(),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
