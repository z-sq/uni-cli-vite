import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
  transformerAttributify
} from 'unocss-applet';

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-');

export default defineConfig({
  include: [/\.(vue|nvue|svelte|[jt]sx|mdx?|astro|elm|html)($|\?)/],
  presets: [
    presetApplet({ enable: isApplet }),
    presetIcons({ warn: true, cdn: 'https://esm.sh/', unit: 'rem' }),
    presetRemRpx({ mode: isApplet ? 'rem2rpx' : 'rpx2rem' })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({ prefixedOnly: true }),
    transformerApplet()
  ]
});
