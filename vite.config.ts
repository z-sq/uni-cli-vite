import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import { UnoCSSToUni } from 'unocss-preset-uni/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    Unocss(),
    // Make sure it's behind Unocss()
    UnoCSSToUni()
  ]
});
