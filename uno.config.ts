import {
  defineConfig,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import {
  presetApplet,
  presetRemToRpx,
  transformerApplet,
  transformerAttributify,
} from 'unocss-applet';

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-');

export default defineConfig({
  include: [/\.(vue|nvue|svelte|[jt]sx|mdx?|astro|elm|html)($|\?)/],
  presets: [
    /**
     * you can add `presetAttributify()` here to enable unocss attributify mode prompt
     * although preset is not working for applet, but will generate useless css
     */
    presetApplet({ enable: isApplet }),
    presetAttributify(),
    presetIcons({ unit: 'rem' }),
    presetRemToRpx({ enable: isApplet }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({ enable: isApplet }),
    transformerApplet({ enable: isApplet }),
  ],
});
