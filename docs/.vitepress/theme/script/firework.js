// used for globally click
if (typeof window !== "undefined") {
  // 等待DOM完全加载
  const initFireworks = function () {
    // 移除可能存在的旧事件监听器
    const oldClickHandler = window._fireworkClickHandler;
    if (oldClickHandler) {
      document.removeEventListener("click", oldClickHandler);

      // 清除可能存在的其他监听器
      const sidebarElements = document.querySelectorAll(
        '.VPSidebar, .VPSidebarItem, .VPDocAsideOutline, .aside-container, .sidebar, [class*="sidebar"]',
      );
      sidebarElements.forEach((el) => {
        if (el) {
          el.removeEventListener("click", oldClickHandler, true);
          el.removeEventListener("click", oldClickHandler);
        }
      });
    }

    // 创建一个新的处理函数并保存引用
    window._fireworkClickHandler = function (e) {
      // 防止重复触发（如果事件已经处理过）
      if (e._fireworkHandled) return;
      e._fireworkHandled = true;

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
      ];

      // 创建一个容器元素，设置最高层级
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "0";
      container.style.top = "0";
      container.style.width = "100%";
      container.style.height = "100%";
      container.style.pointerEvents = "none";
      container.style.zIndex = "999999"; // 更高的层级
      document.body.appendChild(container);

      // 粒子数量
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("firework-particle");

        // 随机粒子大小
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 随机颜色
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];

        // 相对于点击位置定位粒子
        const x = e.clientX - size / 2;
        const y = e.clientY - size / 2;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // 增加内联样式确保显示
        particle.style.position = "absolute";
        particle.style.pointerEvents = "none";
        particle.style.borderRadius = "50%";
        particle.style.opacity = "1";
        particle.style.willChange = "transform, opacity";
        particle.style.zIndex = "999999";

        // 将粒子添加到容器中
        container.appendChild(particle);

        // 物理参数
        const angle = Math.random() * Math.PI * 2; // 360度均匀分布
        const isUpperHalf = angle > 0 && angle < Math.PI; // 判断是否是上半部分

        // 基础速度 - 上半部分的速度略小
        const baseSpeed = Math.random() * 4 + (isUpperHalf ? 11 : 15);

        // 重力系数 - 全局适用
        const gravity = 1.2; // 增加重力效果

        // 持续时间
        const duration = Math.random() * 600 + (isUpperHalf ? 1080 : 1200); // 上半部分持续时间稍短

        // 初始速度分量 - 调整垂直方向的速度
        let vx = Math.cos(angle) * baseSpeed;
        let vy = Math.sin(angle) * baseSpeed;

        // 对上半部分粒子进行特殊处理 - 压缩垂直高度
        if (isUpperHalf) {
          // 减少上半部分的垂直速度至60%，使上半部分更扁平
          vy = vy * 0.8;
        } else {
          // 增加下半部分的垂直速度，使下半部分更拉伸
          vy = vy * 1.1;
        }

        // 创建动画关键帧
        const keyframes = [];
        const steps = 60;

        for (let step = 0; step <= steps; step++) {
          const progress = step / steps;
          const timePos = (progress * duration) / 1000;

          // 水平位移（轻微减速）
          const posX = vx * timePos * 7;

          // 垂直位移（重力加速）- 根据方向调整重力影响
          const gravityEffect = isUpperHalf
            ? 0.5 * gravity * Math.pow(timePos * 2, 2) * 12 // 上半部分重力较小
            : 0.5 * gravity * Math.pow(timePos * 2.2, 2) * 24; // 下半部分重力较大

          const posY = vy * timePos * 8 + gravityEffect;

          // 随时间缩小 - 上半部分粒子缩小得快一些
          const scale = isUpperHalf ? 1 - progress * 0.6 : 1 - progress * 0.5;

          // 透明度变化 - 上半部分粒子消失得快一些
          const opacity = isUpperHalf
            ? 1 - Math.pow(progress, 1.3)
            : 1 - Math.pow(progress, 1.8);

          keyframes.push({
            transform: `translate(${posX}px, ${posY}px) scale(${scale})`,
            opacity: opacity,
          });
        }

        // 执行动画
        const animation = particle.animate(keyframes, {
          duration: duration,
          easing: "ease-out",
          fill: "forwards",
        });

        animation.onfinish = () => {
          particle.remove();
          if (container.childElementCount === 0) {
            container.remove();
          }
        };
      }
    };

    // 添加全局事件监听器
    document.addEventListener("click", window._fireworkClickHandler);

    // 针对VitePress侧边栏的特殊处理
    setTimeout(() => {
      // 查找所有可能的侧边栏元素
      const sidebarSelectors = [
        ".VPSidebar",
        ".VPSidebarItem",
        ".VPDocAsideOutline",
        ".aside-container",
        ".sidebar",
        '[class*="sidebar"]',
        ".VPNav",
        ".VPNavBar",
        ".VPNavBarMenu",
        ".VPNavScreen",
        ".links",
        ".item",
        ".VPMenuLink",
        "nav",
        ".VPNavBarMenuLink",
        ".VPLink",
      ];

      // 尝试为所有可能的侧边栏元素添加事件监听器
      sidebarSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el && !el._hasFireworkHandler) {
            el._hasFireworkHandler = true;
            // 使用捕获阶段优先处理点击事件
            el.addEventListener(
              "click",
              (e) => {
                // 阻止其他处理器重复处理
                if (!e._fireworkHandled) {
                  window._fireworkClickHandler(e);
                }
                // 注意：不阻止事件冒泡，让原本的点击功能正常工作
              },
              true,
            );
          }
        });
      });
    }, 1000); // 延迟执行，确保VitePress已经渲染完成

    // 设置MutationObserver监听DOM变化，为新添加的元素也绑定事件
    const observer = new MutationObserver((mutations) => {
      const sidebarSelectors = [
        ".VPSidebar",
        ".VPSidebarItem",
        ".item",
        ".VPMenuLink",
        ".links",
        ".VPLink",
      ];

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // 元素节点
              // 检查新添加的节点是否是侧边栏相关元素
              sidebarSelectors.forEach((selector) => {
                if (node.matches && node.matches(selector)) {
                  if (!node._hasFireworkHandler) {
                    node._hasFireworkHandler = true;
                    node.addEventListener(
                      "click",
                      window._fireworkClickHandler,
                      true,
                    );
                  }
                }

                // 检查子元素
                const children = node.querySelectorAll(selector);
                children.forEach((child) => {
                  if (!child._hasFireworkHandler) {
                    child._hasFireworkHandler = true;
                    child.addEventListener(
                      "click",
                      window._fireworkClickHandler,
                      true,
                    );
                  }
                });
              });
            }
          });
        }
      });
    });

    // 配置并启动观察器
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  // 初始化时调用
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFireworks);
  } else {
    initFireworks();
  }
}
