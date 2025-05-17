import { defineConfig } from "vitepress";
import mermaid from "mermaid";
import mermaidPlugin from "./theme/plugins/mermaidPlugin.ts";
import markdownItTaskLists from "markdown-it-task-lists";
import { sidebar } from "./sidebar.mts";
import lanternPlugin from "./theme/plugins/lanternPlugin.ts";
// RSS will be handled in the buildEnd hook
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  title: "Chenpeel",
  lang: "zh-CN",
  base: "/",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    math: true,
    config: (md) => {
      md.use(mermaidPlugin);
    },
  },
  head: [
    ["link", { rel: "icon", href: "logo.svg" }],
    [
      "link",
      {
        rel: "alternate",
        type: "application/rss+xml",
        href: "/rss.xml",
        title: "Chenpeel - RSS Feed",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js",
      },
    ],
    [
      "script",
      {},
      `
        document.addEventListener('DOMContentLoaded', function() {
          mermaid.initialize({ startOnLoad: true });
        });
        `,
    ],
    ["link", { rel: "stylesheet", href: "./theme/css/lantern.css" }],
  ],

  themeConfig: {
    logo: "logo.svg",

    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Friends", link: "/links" },
      { text: "RSS", link: "/rss" },
    ],

    // 左侧边栏
    // 见sidebar.mts
    sidebar,

    // 底部跳转
    docFooter: {
      prev: "< 上一篇",
      next: "下一篇 >",
    },
    outline: {
      level: [1, 6],
      label: "文章目录",
    },
    lastUpdatedText: "最后更新时间",
    search: {
      provider: "local",
    },

    footer: {
      copyright:
        'Copyright © 2025-present <a href="https://github.com/chenpeel">Chenpeel</a>',
    },
  },
  vite: {
    plugins: [lanternPlugin()],
  },
  buildEnd: async (siteConfig) => {
    try {
      // Get directory paths
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const distDir = path.resolve(__dirname, "dist");

      // Generate RSS
      console.log("Generating RSS feed at build end");
      const { generateRSS } = await import("./theme/plugins/rss-plugin.mjs");
      await generateRSS();

      console.log("RSS generation complete");
    } catch (error) {
      console.error("Error in buildEnd hook:", error);
    }
  },
});
