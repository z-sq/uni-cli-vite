import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import ja from "./ja.json";
import zhHans from "./zh-Hans.json";
import zhHant from "./zh-Hant.json";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: uni.getLocale(), // 设置地区
  // 设置地区信息
  messages: {
    en,
    es,
    fr,
    ja,
    /* #ifdef MP */
    zh_CN: zhHans,
    zh_TW: zhHant,
    zh_HK: zhHant,
    /* #endif */
    "zh-Hans": zhHans,
    "zh-Hant": zhHant,
  },
});

export default i18n;
