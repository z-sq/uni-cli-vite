import type { Preset } from 'unocss';
import { defineConfig, presetIcons } from 'unocss';
import transformerCompileClass from '@unocss/transformer-compile-class';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

import { presetUni } from 'unocss-preset-uni';

function presetRemToRpx(): Preset<{}> {
  const remRE = /^-?[\.\d]+rem$/;
  return {
    name: 'unocss-preset-rem-to-rpx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1];
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = `${+value.slice(0, -3) * 32}rpx`;
      });
    }
  };
}

export default defineConfig({
  presets: [
    presetUni() as Preset,
    presetIcons({ unit: 'rem' }),
    presetRemToRpx()
  ],
  transformers: [
    transformerCompileClass(),
    transformerDirective(),
    transformerVariantGroup()
  ]
});
