import { defineConfig } from "vitepress";
import rssPlugin from "./rss-plugin.mjs";

export default defineConfig({
  title: "Chenpeel",
  lang: "zh-CN",
  base: "/",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    math: true,
  },
  head: [
    ["link", { rel: "icon", href: "logo.svg" }][
      ("script",
      {
        type: "text/javascript",
        src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
      })
    ],
    [
      "script",
      {},
      `
            MathJax = {
              tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true,
                processEnvironments: true,
                autoload: {
                  color: [],
                  colorV2: ['color']
                },
                tags: 'ams',
                tagSide: 'right',
                tagIndent: '0.8em',
                useLabelIds: true
              },
              options: {
                renderActions: {
                  addMenu: [0, '', '']
                }
              },
              chtml: {
                displayAlign: 'center',
                displayIndent: '0em',
                scale: 1,
                minScale: 0.5,
                mtextInheritFont: true,
                merrorInheritFont: true,
                mtextFont: '',
                merrorFont: '',
                unknownFamily: 'serif',
                mathmlSpacing: false,
                skipAttributes: {},
                exFactor: 0.5,
                displayWidth: '100%',
                linebreaks: {
                  automatic: true,
                  width: 'container'
                }
              }
            };
          `,
    ],
    // 引入自定义 CSS
    ["link", { rel: "stylesheet", href: "./theme/mathjax.css" }],
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
    sidebar: {
      "/tools/": [
        // 工具🔧
        {
          collapsed: true,
          text: "Tools",
          items: [
            { text: "Markdown", link: "/tools/markdown" },
            { text: "五笔输入法", link: "/tools/wubi" },
            { text: "Vim", link: "/tools/vim" },
            { text: "Make", link: "/tools/make" },
            { text: "CMake", link: "/tools/cmake" },
          ],
        },
      ],
      // 笔记📒
      "/cs/": [
        {
          collapsed: true,
          text: "CS",
          items: [
            {
              collapsed: true,
              text: "Basic CS",
              items: [
                { text: "Computer Architecture", link: "/cs/basicCS/ca" },
                { text: "Computer Network", link: "/cs/basicCS/cn" },
                { text: "Oprating System", link: "/cs/basicCS/os" },
                {
                  collapsed: true,
                  text: "Linux",
                  items: [
                    {
                      text: "Linux Basic",
                      link: "/cs/basicCS/linux/linux-basic",
                    },
                    {
                      text: "Linux Command Basic",
                      link: "/cs/basicCS/linux/linux-command-basic",
                    },
                    {
                      text: "Linux Command Pro",
                      link: "/cs/basicCS/linux/linux-command-pro",
                    },
                    {
                      text: "Shell Programing",
                      link: "/cs/basicCS/linux/linux-shell-programing",
                    },
                    //linux src
                    // {
                    //   text: 'Linux Source Codes',
                    //   link: '/cs/linux/linux-src'
                    // },
                  ],
                },
                { text: "Assembly", link: "/cs/basicCS/assembly" },
                { text: "Data Structure", link: "/cs/basicCS/ds" },
                {
                  collapsed: true,
                  text: "Algorithms",
                  items: [
                    { text: "README", link: "/cs/basicCS/algorithms/readme" },
                    {
                      text: "Recursion",
                      link: "/cs/basicCS/algorithms/analysis/recursion",
                    },
                    {
                      text: "Divide_Conquer",
                      link: "/cs/basicCS/algorithms/analysis/divide_conquer",
                    },
                    {
                      text: "Dynamic_Programing",
                      link: "/cs/basicCS/algorithms/analysis/dynamic_programing",
                    },
                    {
                      text: "Greedy",
                      link: "/cs/basicCS/algorithms/analysis/greedy",
                    },
                    {
                      text: "Back_Track",
                      link: "/cs/basicCS/algorithms/analysis/back_track",
                    },
                  ],
                },
              ],
            },
            {
              collapsed: true,
              text: "List",
              items: [
                {
                  collapsed: true,
                  text: "Web",
                  items: [
                    {
                      text: "HTML",
                      link: "/cs/list/web/html",
                    },
                    {
                      text: "CSS",
                      link: "/cs/list/web/css",
                    },
                    {
                      text: "JavaScript",
                      link: "/cs/list/web/javascript",
                    },
                  ],
                },
                {
                  text: "MySql",
                  link: "/cs/list/mysql",
                },
              ],
            },

            {
              collapsed: true,
              text: "Docker",
              items: [
                {
                  text: "Intro",
                  link: "/cs/docker/intro",
                },
                {
                  text: "server(DNS,FTP,Web)",
                  link: "/cs/docker/server",
                },
              ],
            },

            {
              collapsed: true,
              text: "AI",
              items: [
                {
                  text: "Intro",
                  link: "/cs/ai/intro",
                },
                {
                  text: "Machine Learning",
                  link: "/cs/ai/machine_learning",
                },
              ],
            },
          ],
        },
      ],

      "/math/": [
        // 数学🔬
        {
          text: "Math",
          collapsed: true,
          items: [
            {
              text: "Logical Reasoning",
              collapsed: true,
              items: [{ text: "Basic Concept", link: "/math/LR/concept" }],
            },
            {
              text: "Mathematics' Analysis",
              collapsed: true,
              items: [
                { text: "MA pre", link: "/math/MA/pre" },
                { text: "Set of Numbers", link: "/math/MA/Set_of_Numbers" },
                { text: "Real Numbers", link: "/math/MA/Real_Numbers" },
              ],
            },
            {
              text: "PT&MS",
              collapsed: true,
              items: [{ text: "Cov&\\rho", link: "/math/PT&MS/CCC.md" }],
            },
            {
              text: "Matrix",
              collapsed: true,
              items: [
                // { text: 'Matrix\'s SVD', link: '/math/Matrix/SVD' },
                {
                  text: "Matrix's Derivation",
                  link: "/math/Matrix/matrix_derivation",
                },
              ],
            },
          ],
        },
      ],
      "/literature/": [
        // 文学
        {
          text: "Literature",
          collapsed: true,
          items: [
            {
              text: "POEM",
              collapsed: true,
              items: [
                { text: "《诗经》", link: "/literature/POEM/pre" },
                { text: "《毛诗序》", link: "/literature/POEM/毛诗序" },
                { text: "《关雎》", link: "/literature/POEM/关雎" },
                { text: "《葛覃》", link: "/literature/POEM/葛覃" },
                { text: "《苍耳》", link: "/literature/POEM/苍耳" },
                { text: "《樛木》", link: "/literature/POEM/樛木" },
                { text: "《螽斯》", link: "/literature/POEM/螽斯" },
                { text: "《桃夭》", link: "/literature/POEM/桃夭" },
                { text: "《兔罝》", link: "/literature/POEM/兔罝" },
              ],
            },
            {
              text: "Modern",
              collapsed: true,
              items: [
                { text: "《冥想》", link: "/literature/modern/mingxiang" },
              ],
            },
          ],
        },
      ],
      "/stories": [
        {
          text: "Stories",
          collapsed: true,
          items: [
            { text: "《贴吧老哥流浪篇》", link: "/stories/tiebaliulang" },
            { text: "《菊花三弄》", link: "/stories/juhuasannong" },
          ],
        },
      ],
    },
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
        'Copyright © 2023-present <a href="https://github.com/chenpeel">Chenpeel</a>',
    },
  },
  vite: {
    plugins: [rssPlugin()],
  },
});
