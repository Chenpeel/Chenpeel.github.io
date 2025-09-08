import DefaultTheme from "vitepress/theme";
import "./script/firework.js";
import "./script/keyboard.js";
import "./css/article.css";
import "./css/book.css";
import "./css/card.css";
import "./css/custom.css";
import "./css/firework.css";
import "./css/keyboard.css";
import "./css/lantern.css";
import "./css/ring.css";
import "./css/table.css";
import "./plugins/mermaidPlugin.ts";
import Mermaid from "./components/Mermaid.vue";
import "./css/lantern.css";
import "./script/lantern.js";
import NahidaLive2D from "./components/NahidaLive2D.vue";
import NahidaChat from "./components/NahidaChat.vue";
import Layout from "./Layout.vue";
import LovePage from "./components/LovePage.vue";
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp: async ({ app }) => {
    app.component("Mermaid", Mermaid);
    app.component("NahidaLive2D", NahidaLive2D);
    app.component("NahidaChat", NahidaChat);
  },
};
