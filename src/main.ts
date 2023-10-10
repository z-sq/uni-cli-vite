import { createSSRApp } from "vue";
import App from "./App.vue";
import "uno.css";
import i18n from "./locale";
import { createPinia } from "pinia";
export function createApp() {
  const app = createSSRApp(App);
  app.use(i18n);
  app.use(createPinia());
  return {
    app,
  };
}
