// used for globally click
if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    const colors = [
      "#FF1461",
      "#18FF92",
      "#5A87FF",
      "#FBF38C",
      "#FF7A00",
      "#FFED00",
      "#6BFFFB",
      "#D400FF",
      "#FF6F61",
      "#00FF9D",
      "#FFC0CB",
      "#00FFFF",
      "#FF1493",
      "#FFFF00",
      "#32CD32",
      "#1E90FF",
      "#FF4500",
      "#800080",
      "#FFD700",
      "#C71585",
      "#20B2AA",
      "#F4A300",
      "#FF6347",
      "#DA70D6",
      "#98FB98",
      "#B22222",
      "#9932CC",
      "#87CEEB",
      "#FF8C00",
    ];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("firework-particle");
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${e.pageX}px`;
      particle.style.top = `${e.pageY}px`;
      document.body.appendChild(particle);

      // 计算初始方向
      const angle = Math.random() * 2 * Math.PI;
      const velocity = Math.random() * 200 + 100;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      // 创建贝塞尔曲线控制点
      const controlX = dx * 0.5;
      const controlY = dy * 0.4 + 10;
      const endX = dx * 0.85 + 10;
      const endY = dy + 50;

      // 创建烟花效果的动画
      const animation = particle.animate(
        [
          { opacity: 1, offset: 0, transform: `translate(0, 0)` },
          {
            opacity: 0.8,
            offset: 0.5,
            transform: `translate(${controlX}px, ${controlY}px)`,
          },
          {
            opacity: 0,
            offset: 1,
            transform: `translate(${endX}px, ${endY}px)`,
          },
        ],
        { duration: Math.random() * 1000 + 500, easing: "ease-out" },
      );

      animation.onfinish = () => particle.remove();
    }
  });
}
