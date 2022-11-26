import type { ConfigEnv, UserConfigExport } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      uni(),
      Unocss(),
      visualizer({ emitFile: true }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ]
  };
};
