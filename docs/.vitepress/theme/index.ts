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

export default {
  extends: DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component("Mermaid", Mermaid);
  },
};