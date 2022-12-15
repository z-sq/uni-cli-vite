import { defineConfig, loadEnv, type PluginOption } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const { NODE_ENV } = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      uni(),
      Unocss(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: command === 'serve'
      }),
      ...(NODE_ENV == 'production'
        ? [visualizer({ emitFile: true }) as PluginOption]
        : [])
    ]
  };
});
