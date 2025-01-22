import { defineConfig } from "vitepress";
import mermaid from "mermaid";
import mermaidPlugin from "./plugins/mermaidPlugin.ts";
import rssPlugin from "./rss-plugin.mjs";
import { sidebar } from "./sidebar.mts";
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
    plugins: [rssPlugin()],
  },
});
