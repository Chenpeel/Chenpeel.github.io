export const sidebarRoots = [
  { base: "/tools/", dir: "tools" },
  { base: "/tips/", dir: "tips" },
  { base: "/cs/", dir: "cs" },
  { base: "/math/", dir: "math" },
  { base: "/literature/", dir: "literature" },
  { base: "/stories", dir: "stories" },
];

export const dirMeta = {
  tools: {
    text: "Tools",
    collapsed: false,
    order: ["markdown", "wubi", "vim", "make", "cmake"],
  },
  tips: {
    text: "Tips",
    collapsed: false,
    indexText: "Tips",
    order: ["kaggle_train"],
    itemText: {
      kaggle_train: "Kaggle免费算力指北",
    },
  },
  cs: {
    text: "Computer Science",
    collapsed: false,
    order: ["basic", "algorithms", "linux", "ai", "docker", "embed"],
  },
  "cs/basic": {
    text: "计算机基础",
    collapsed: false,
    order: ["c_cpp", "ds", "ca", "os", "cn", "db", "web"],
  },
  "cs/basic/c_cpp": {
    text: "C/C++",
    collapsed: true,
    indexText: "开启C/C++之旅",
    order: ["0x00", "0x01", "0x02"],
    itemText: {
      "0x00": "0x00 小试牛刀",
      "0x01": "0x01 细细品味",
      "0x02": "0x02 初入C++",
    },
  },
  "cs/basic/ds": {
    text: "数据结构",
    collapsed: true,
    indexText: "开启数据结构之旅",
  },
  "cs/basic/ca": {
    text: "计算机组成原理",
    collapsed: true,
    indexText: "开启计算机组成原理之旅",
    order: ["0x00", "assembly", "ca"],
    itemText: {
      "0x00": "计算机结构及发展历程",
    },
  },
  "cs/basic/os": {
    text: "操作系统",
    collapsed: true,
    indexText: "开启操作系统之旅",
  },
  "cs/basic/cn": {
    text: "计算机网络",
    collapsed: true,
    indexText: "开启计算机网络之旅",
  },
  "cs/basic/db": {
    text: "数据库",
    collapsed: true,
    indexText: "开启数据库之旅",
    order: ["mysql"],
  },
  "cs/basic/web": {
    text: "Web前端",
    collapsed: true,
    indexText: "开启Web前端之旅",
    order: ["html", "css", "javascript"],
    itemText: {
      html: "HTML",
      css: "CSS",
      javascript: "JavaScript",
    },
  },
  "cs/algorithms": {
    text: "算法",
    collapsed: true,
    indexText: "写在前面",
    order: [
      "recursion",
      "divide_conquer",
      "dynamic_programing",
      "back_track",
      "greedy",
    ],
    itemText: {
      recursion: "递归",
      divide_conquer: "分治",
      dynamic_programing: "动态规划",
      back_track: "回溯",
      greedy: "贪心",
    },
  },
  "cs/linux": {
    text: "Linux",
    collapsed: true,
    indexText: "写在前面",
    order: ["0x00", "0x01", "0x02", "0x60", "0x70"],
    itemText: {
      "0x00": "man",
      "0x01": "other",
      "0x60": "shell编程",
    },
  },
  "cs/ai": {
    text: "AI",
    collapsed: true,
    indexText: "写在前面",
    order: ["machine_learning", "agent"],
    itemText: {
      machine_learning: "Machine Learning",
    },
  },
  "cs/docker": {
    text: "Docker",
    collapsed: true,
    indexText: "写在前面",
    order: ["server"],
  },
  "cs/embed": {
    text: "嵌入式",
    collapsed: true,
    indexText: "写在前面",
  },
  math: {
    text: "Math",
    collapsed: false,
    order: ["LR", "MA", "PT&MS", "Matrix", "pgmath", "Set", "AA"],
  },
  "math/LR": {
    text: "逻辑推理",
    collapsed: true,
    indexText: "基础",
  },
  "math/MA": {
    text: "数学分析",
    collapsed: true,
    indexText: "写在前面",
    order: ["Set_of_Numbers", "Real_Numbers"],
    itemText: {
      Set_of_Numbers: "数 集",
      Real_Numbers: "实 数",
    },
  },
  "math/PT&MS": {
    text: "概率论与数理统计",
    collapsed: true,
    order: ["CCC"],
    itemText: {
      CCC: "协方差与相关系数",
    },
  },
  "math/Matrix": {
    text: "矩 阵",
    collapsed: true,
    order: ["matrix_derivation", "SVD"],
    itemText: {
      matrix_derivation: "矩阵求导",
      SVD: "奇异值分解(SVD)",
    },
  },
  "math/pgmath": {
    text: "考研数学一",
    collapsed: true,
    indexText: "写在前面",
    order: ["calculus", "linear-algebra", "probability"],
  },
  "math/pgmath/calculus": {
    text: "微积分",
    collapsed: true,
    indexText: "写在前面",
    order: ["Calculus_Formulas"],
    itemText: {
      Calculus_Formulas: "微积分公式速查表",
    },
  },
  "math/pgmath/linear-algebra": {
    text: "线性代数",
    collapsed: true,
    indexText: "写在前面",
  },
  "math/pgmath/probability": {
    text: "概率论",
    collapsed: true,
    indexText: "写在前面",
  },
  "math/Set": {
    text: "集合论",
    collapsed: true,
    indexText: "写在前面",
  },
  "math/AA": {
    text: "抽象代数",
    collapsed: true,
    indexText: "写在前面",
  },
  literature: {
    text: "Literature",
    collapsed: false,
    order: ["POEM", "modern"],
  },
  "literature/POEM": {
    text: "《诗经》",
    collapsed: true,
    indexText: "写在前面",
    order: ["毛诗序", "关雎", "葛覃", "苍耳", "樛木", "螽斯", "桃夭", "兔罝"],
    itemText: {
      毛诗序: "《毛诗序》",
      关雎: "《关雎》",
      葛覃: "《葛覃》",
      苍耳: "《苍耳》",
      樛木: "《樛木》",
      螽斯: "《螽斯》",
      桃夭: "《桃夭》",
      兔罝: "《兔罝》",
    },
  },
  "literature/modern": {
    text: "Modern",
    collapsed: true,
    order: ["mingxiang"],
    itemText: {
      mingxiang: "《冥想》",
    },
  },
  stories: {
    text: "Stories",
    collapsed: true,
    order: ["tiebaliulang", "juhuasannong"],
    itemText: {
      tiebaliulang: "《贴吧老哥流浪篇》",
      juhuasannong: "《菊花三弄》",
    },
  },
};
