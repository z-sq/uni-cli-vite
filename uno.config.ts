import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  rules: [
    [
      /^intrinsic-h-(\d+)$/,
      ([, d]) => ({ "content-visibility": "auto", "contain-intrinsic-height": `auto ${Number(d) / 4}rem` }),
    ],
  ],
  presets: [presetUni(), presetIcons({ warn: true, cdn: "https://esm.sh/", unit: "rem" })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
