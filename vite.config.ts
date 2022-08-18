import type { ConfigEnv, UserConfigExport } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import { UnoCSSToUni } from 'unocss-preset-uni/vite';
import { viteMockServe } from 'vite-plugin-mock';

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      uni(),
      Unocss(),
      // Make sure it's behind Unocss()
      UnoCSSToUni(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ]
  };
};
