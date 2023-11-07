import { defineConfig } from 'vitepress'


export default defineConfig({
  title: "Chenpeel",
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
    
    // 左侧边栏
    sidebar: [
      // 工具🔧
      {
        collapsed:true,
        text: 'Tools',
        items: [
          { text: 'Vim', link: '/tools/Vim' },
          { text: 'Make', link: '/tools/make'},
          { text: 'Cmake', link: '/tools/Cmake' },
          { text: 'Markdown', link: '/tools/Markdown' },
          { text: 'Text-Input', link: '/tools/wubi' }
        ]
      },
      // 笔记📒
      {
        collapsed:true,
        text: 'Notes',
        items: [
          { text: 'Assembly', link: '/notes/assembly' },
          {
            collapsed:true,
            text: 'Algorithms',
            items: [
              { text: 'README', link: '/notes/algorithms/index' },
              { text: 'Recursion', link: '/notes/algorithms/analysis/recursion' },
              { text: 'Divide_Conquer', link: '/notes/algorithms/analysis/divide_conquer' },
              { text: 'Dynamic_Programing', link: '/notes/algorithms/analysis/dynamic_programing' },
              { text: 'Greedy', link: '/notes/algorithms/analysis/greedy' },
              { text: 'Back_Track', link: '/notes/algorithms/analysis/back_track' }
            ]
          },
          { 
            collapsed:true,
            text: 'Linux',
            items: [
              {
                text: 'Linux Basic',
                link: '/notes/linux/linux-basic'
              },
              {
                text: 'Linux Command Basic',
                link: '/notes/linux/linux-command-basic'
              },
              {
                text: 'Linux Command Pro',
                link: '/notes/linux/linux-command-pro'
              },
              {
                text: 'Shell Programing',
                link: '/notes/linux/linux-shell-programing'
              },
              //linux src 
              // {
              //   text: 'Linux Source Codes',
              //   link: '/notes/linux/linux-src'
              // },
            ]
          },
          { text: 'Machine_Learn', link: '/notes/machine_learn' },
          { text: 'MySQL', link: '/notes/mysql' },
          { text: 'POCC', link: '/notes/POCC' },
          { 
            collapsed:true,
            text: 'Web',
            items: [
              {
                text: 'HTML',
                link: '/notes/web/html'
              },
              {
                text: 'CSS',
                link: '/notes/web/css'
              },
              {
                text: 'JavaScript',
                link: '/notes/web/javascript'
              },
            ]
          },
          

        ]
        
      },
      
      // 数学🔬
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
      // 文学
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
              { text: '《葛覃》', link: '/literature/POEM/葛覃'},
              { text: '《苍耳》', link: '/literature/POEM/苍耳'},
              { text: '《樛木》', link: '/literature/POEM/樛木'},
              { text: '《螽斯》', link: '/literature/POEM/螽斯'},
              { text: '《桃夭》', link: '/literature/POEM/桃夭'}
            ]
          }
        ]
      },
      // 书库📖
      {
        text: 'Boooooook',
        collapsed:true,
        items:[
        ]

      }

    ],
    // 底部跳转
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
