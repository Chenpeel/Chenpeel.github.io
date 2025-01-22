import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "./firework.js";
import "./firework.css";
import "./ring.css";
import "./card.css";
import "./article.css";
import "./book.css";
import "./keyboard.css";
import "./keyboard.js";
import "./lantern.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {},
};
