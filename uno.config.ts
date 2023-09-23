import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from "unocss-applet";

const isApplet = process.env?.UNI_PLATFORM?.startsWith("mp-");

export default defineConfig({
  rules: [
    [
      /^intrinsic-h-(\d+)$/,
      ([, d]) => ({ "content-visibility": "auto", "contain-intrinsic-height": `auto ${Number(d) / 4}rem` }),
    ],
  ],
  presets: [
    presetApplet({ enable: isApplet }),
    presetIcons({ warn: true, cdn: "https://esm.sh/", unit: "rem" }),
    presetRemRpx({ mode: isApplet ? "rem2rpx" : "rpx2rem" }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({ prefixedOnly: true }),
    transformerApplet(),
  ],
});
