// .vitepress/enhanceApp.ts
import { inBrowser } from "vitepress";
import mermaid from "mermaid";

export default ({ router }) => {
  if (inBrowser) {
    router.onReady(() => {
      console.log("Initializing Mermaid...");
      mermaid.initialize({ startOnLoad: true });
      mermaid.init(); // 确保 Mermaid 初始化
      console.log("Mermaid initialized.");
    });
  }
};
