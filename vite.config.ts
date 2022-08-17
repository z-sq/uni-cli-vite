import type { ConfigEnv, UserConfigExport } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      uni(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ]
  };
};
