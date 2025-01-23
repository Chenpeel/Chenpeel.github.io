export const sidebar = {
  ////////////////////////////////////////      Tools     ////////////////////////////////////////
  "/tools/": [
    {
      collapsed: false,
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
  ////////////////////////////////////////Computer Science////////////////////////////////////////
  "/cs/": [
    {
      collapsed: false,
      text: "Computer Science",
      items: [
        {
          collapsed: false,
          text: "计算机基础",
          items: [
            {
              collapsed: true,
              text: "C/C++",
              items: [
                { text: "开启C/C++之旅", link: "/cs/basic/c_cpp/" },
                { text: "0x00 Simple Main", link: "/cs/basic/c_cpp/0x00" },
              ],
            },
            {
              collapsed: true,
              text: "数据结构",
              items: [{ text: "开启数据结构之旅", link: "/cs/basic/ds/" }],
            },
            {
              collapsed: true,
              text: "计算机组成原理",
              items: [
                { text: "开启计算机组成原理之旅", link: "/cs/basic/ca/" },
                { text: "计算机结构及发展历程", link: "/cs/basic/ca/0x00" },
              ],
            },
            {
              collapsed: true,
              text: "操作系统",
              items: [{ text: "开启操作系统之旅", link: "/cs/basic/os/" }],
            },
            {
              collapsed: true,
              text: "计算机网络",
              items: [{ text: "开启计算机网络之旅", link: "/cs/basic/cn/" }],
            },
            {
              collapsed: true,
              text: "数据库",
              items: [{ text: "开启数据库之旅", link: "/cs/basic/db/" }],
            },
            {
              collapsed: true,
              text: "Web前端",
              items: [
                { text: "开启Web前端之旅", link: "/cs/basic/web/" },
                { text: "HTML", link: "/cs/basic/web/html" },
                { text: "CSS", link: "/cs/basic/web/css" },
                { text: "JavaScript", link: "/cs/basic/web/javascript" },
              ],
            },
          ],
        },
        {
          collapsed: true,
          text: "算法",
          items: [
            { text: "写在前面", link: "/cs/algorithms/" },
            { text: "递归", link: "/cs/algorithms/recursion" },
            { text: "分治", link: "/cs/algorithms/divide_conquer" },
            { text: "动态规划", link: "/cs/algorithms/dynamic_programing" },
            { text: "回溯", link: "/cs/algorithms/back_track" },
            { text: "贪心", link: "/cs/algorithms/greedy" },
          ],
        },
        {
          collapsed: true,
          text: "Linux",
          items: [
            { text: "写在前面", link: "/cs/linux/" },
            { text: "man", link: "/cs/linux/0x00" },
            { text: "other", link: "/cs/linux/0x01" },
            { text: "shell编程", link: "/cs/linux/0x60" },
          ],
        },
        {
          collapsed: true,
          text: "AI",
          items: [
            { text: "写在前面", link: "/cs/ai/" },
            { text: "Machine Learning", link: "/cs/ai/machine_learning" },
          ],
        },
        {
          collapsed: true,
          text: "Docker",
          items: [{ text: "写在前面", link: "/cs/docker/" }],
        },
      ],
    },
  ],
  ////////////////////////////////////////Math////////////////////////////////////////
  "/math/": [
    {
      text: "Math",
      collapsed: false,
      items: [
        {
          text: "逻辑推理",
          collapsed: true,
          items: [{ text: "基础", link: "/math/LR/" }],
        },
        {
          text: "数学分析",
          collapsed: true,
          items: [
            { text: "写在前面", link: "/math/MA/" },
            { text: "数 集", link: "/math/MA/Set_of_Numbers" },
            { text: "实 数", link: "/math/MA/Real_Numbers" },
          ],
        },
        {
          text: "概率论与数理统计",
          collapsed: true,
          items: [{ text: "Cov&\\rho", link: "/math/PT&MS/CCC.md" }],
        },
        {
          text: "矩 阵",
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
  ////////////////////////////////////////Literature////////////////////////////////////////
  "/literature/": [
    {
      text: "Literature",
      collapsed: false,
      items: [
        {
          text: "《诗经》",
          collapsed: true,
          items: [
            { text: " 写在前面 ", link: "/literature/POEM/" },
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
          items: [{ text: "《冥想》", link: "/literature/modern/mingxiang" }],
        },
      ],
    },
  ],
  ////////////////////////////////////////Stories////////////////////////////////////////
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
};
