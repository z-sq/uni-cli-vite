import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite";
import checker from "vite-plugin-checker";
import VueDevTools from "vite-plugin-vue-devtools";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ command }) => {
  return {
    plugins: [
      VueDevTools(),
      uni(),
      Unocss(),
      checker({ overlay: false, vueTsc: true }),
      viteMockServe({
        ignore: /^\_/,
        enable: command === "serve",
      }),
    ],
  };
});
