import { defineConfig } from 'vitepress'


export default defineConfig({
  title: "Chenpeel",
  description: "Chenpeel's blog",
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    math: true
  },
  head: [
    ["link", { rel: "icon", href: "/avatar.png" }],
  ],
  themeConfig: {
    logo: 'logo.svg', 
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Friends', link: '/links.md' }
    ],

    sidebar: [
      {
        collapsed:true,
        text: 'Tools',
        items: [
          { text: 'Vim', link: '/tools/Vim' },
          { text: 'Cmake', link: '/tools/Cmake' },
          { text: 'Markdown', link: '/tools/Markdown' }
        ]
      },
      {
        collapsed:true,
        text: 'Notes',
        items: [
          { text: 'Assembly', link: '/notes/assembly' },
          { text: 'Linux & Shell', link: '/notes/linux_shell' },
          { text: 'Machine_Learn', link: '/notes/machine_learn' },
          { text: 'MySQL', link: '/notes/mysql' },
          { text: 'POCC', link: '/notes/POCC' },
          { text: 'Web', link: '/notes/web' }
        ]
      },
      {
        collapsed:true,
        text: 'Algorithms',
        items: [
          { text: 'README', link: '/notes/algorithms/algos' },
          { text: 'Recursion', link: '/notes/algorithms/analysis/recursion' },
          { text: 'Divide_Conquer', link: '/notes/algorithms/analysis/divide_conquer' },
          { text: 'Dynamic_Programing', link: '/notes/algorithms/analysis/dynamic_programing' },
          { text: 'Greedy', link: '/notes/algorithms/analysis/greedy' },
          { text: 'Back_Track', link: '/notes/algorithms/analysis/back_track' }
        ]
      },
      {
        text: 'Math',
        collapsed:true,
        items:[
          {
            text: 'Mathematics\' Analysis',
        collapsed:true,    
            items:[
              { text: 'Peano', link: '/math/MA/Peano',},
            ]
          }
        ]
      },
      {
        text: 'Literature',
        collapsed:true,
        items:[
          {
            text: 'POEM',
        collapsed:true,    
            items:[
              { text: '《诗经》', link: '/literature/POEM/pre',},
              { text: '《毛诗序》', link: '/literature/POEM/毛诗序',},
              { text: '《关雎》', link: '/literature/POEM/关雎',},
            ]
          }
        ]
      }

    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    outline: {
      level: [1, 6],
      label: '文章目录'
    },
    lastUpdatedText: '最后更新时间',
    search: {
      provider: 'local',
    },


    footer: {
      copyright: 'Copyright © 2023-present <a href="https://github.com/chenpeel">Chenpeel</a>'
    }
  }

})
