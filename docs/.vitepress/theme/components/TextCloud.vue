<template>
    <div class="cloud-container" ref="cloudContainer">
        <div class="cloud">
            <div
                v-for="(word, index) in words"
                :key="index"
                class="cloud-word"
                :style="getWordStyle(word)"
                @mouseover="hoverWord(index)"
                @mouseout="resetHover(index)"
            >
                {{ word.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, onBeforeUnmount } from "vue";

// 容器引用
const cloudContainer = ref(null);

// 词云配置
const ROTATION_SPEED = 1.5; // 每秒旋转的角度（弧度）
const EARTH_AXIAL_TILT = 23.4; // 地球黄赤交角

// 定义词云数据
const words = reactive([
    // 计算机科学相关
    {
        text: "C++",
        size: 28,
        color: "#ff0066",
        weight: "bold",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "数据结构",
        size: 25,
        color: "#ffeb3b",
        weight: "bold",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "算法",
        size: 25,
        color: "#ffeb3b",
        weight: "bold",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "Python",
        size: 23,
        color: "#728942",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "机器学习",
        size: 22,
        color: "#3bf2ff",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "线性模型",
        size: 20,
        color: "#ff7043",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "神经网络",
        size: 21,
        color: "#8a2be2",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "决策树",
        size: 19,
        color: "#64b5f6",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },

    // 数学相关
    {
        text: "矩阵",
        size: 23,
        color: "#4caf50",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "线性代数",
        size: 20,
        color: "#5c6bc0",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "概率论",
        size: 19,
        color: "#ab47bc",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },

    // 文学相关
    {
        text: "诗经",
        size: 22,
        color: "#d32f2f",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "文学",
        size: 20,
        color: "#ec407a",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "古诗",
        size: 18,
        color: "#f06292",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },

    // 工具与技能
    {
        text: "Git",
        size: 18,
        color: "#f4511e",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "Linux",
        size: 21,
        color: "#ffa000",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "Docker",
        size: 19,
        color: "#0288d1",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "Vim",
        size: 17,
        color: "#388e3c",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "Markdown",
        size: 18,
        color: "#616161",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },

    // 个人特色
    {
        text: "乐只君子",
        size: 24,
        color: "#9c27b0",
        weight: "bold",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "福履将之",
        size: 24,
        color: "#673ab7",
        weight: "bold",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "料峭春风",
        size: 19,
        color: "#26a69a",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "Chenpeel",
        size: 26,
        color: "#03a9f4",
        weight: "bold",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },

    // 其他关键概念
    {
        text: "计算机",
        size: 18,
        color: "#ff5722",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "数据库",
        size: 19,
        color: "#795548",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "网络",
        size: 18,
        color: "#607d8b",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "操作系统",
        size: 19,
        color: "#009688",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
    {
        text: "网页",
        size: 17,
        color: "#e91e63",
        weight: "normal",
        x: 0,
        y: 0,
        z: 0,
        initialX: 0,
        initialY: 0,
        initialZ: 0,
        isHovered: false,
        angle: Math.random() * 20 - 10,
    },
]);

// 响应式设计参数
const containerWidth = ref(0);
const containerHeight = ref(0);
const cloudRadius = computed(() => {
    // 基于容器尺寸的动态半径
    return Math.min(containerWidth.value, containerHeight.value) * 0.4;
});

// 当前旋转角度和时间控制
let currentAngle = 0;
let lastTimestamp = 0;
let animationFrame = null;

// 初始化和屏幕大小调整处理
onMounted(() => {
    const updateContainerSize = () => {
        if (cloudContainer.value) {
            containerWidth.value = cloudContainer.value.clientWidth;
            containerHeight.value = cloudContainer.value.clientHeight;
            distributeWordsSpread(); // 分散分布词条
        }
    };

    // 初始设置
    updateContainerSize();

    // 监听窗口大小变化
    window.addEventListener("resize", updateContainerSize);

    // 开始动画
    startSmoothAnimation();
});

onBeforeUnmount(() => {
    stopAnimation();
    window.removeEventListener("resize", updateContainerSize);
});

// 分散分布词条 - 使用球坐标系但确保词条分散
const distributeWordsSpread = () => {
    // 获取容器尺寸
    const width = containerWidth.value;
    const height = containerHeight.value;

    // 计算椭球参数，根据屏幕比例调整
    const horizontalRadius = width * 0.45; // 水平半径
    const verticalRadius = height * 0.5; // 垂直半径
    const depthRadius = Math.min(width, height) * 0.7; // 深度半径

    // 使用更分散的算法
    words.forEach((word, i) => {
        // 基于索引计算均匀分布的球面坐标
        const phi = Math.acos(-1 + (2 * i) / words.length); // 垂直角度 [0, π]
        const theta = Math.sqrt(words.length * Math.PI) * phi; // 水平角度

        // 计算三维坐标（球坐标转笛卡尔坐标）
        // 缩放到椭球体
        word.initialX = horizontalRadius * Math.sin(phi) * Math.cos(theta);
        word.initialY = verticalRadius * Math.sin(phi) * Math.sin(theta);
        word.initialZ = depthRadius * Math.cos(phi);

        // 添加随机抖动，避免过于规则
        const jitterFactor = 0.15; // 控制抖动程度
        word.initialX *= 1 + (Math.random() - 0.5) * jitterFactor;
        word.initialY *= 1 + (Math.random() - 0.5) * jitterFactor;
        word.initialZ *= 1 + (Math.random() - 0.5) * jitterFactor;

        // 设置初始位置
        word.x = word.initialX;
        word.y = word.initialY;
        word.z = word.initialZ;
    });
};

// 使用requestAnimationFrame实现均匀旋转
const startSmoothAnimation = () => {
    lastTimestamp = performance.now();

    const animate = (timestamp) => {
        // 计算自上次动画帧以来的时间差（毫秒）
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // 计算旋转角度增量（弧度）
        // ROTATION_SPEED是每秒旋转的弧度量
        const angleIncrement = (ROTATION_SPEED * deltaTime) / 1000;

        // 更新当前角度
        currentAngle += angleIncrement;

        // 应用旋转到每个词
        words.forEach((word) => {
            if (!word.isHovered) {
                // 从初始位置应用旋转
                const x = word.initialX;
                const z = word.initialZ;

                // 应用旋转矩阵绕Y轴
                word.x =
                    x * Math.cos(currentAngle) - z * Math.sin(currentAngle);
                word.z =
                    z * Math.cos(currentAngle) + x * Math.sin(currentAngle);
            }
        });

        animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
};

// 停止动画
const stopAnimation = () => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
};

// 鼠标悬停效果
const hoverWord = (index) => {
    words[index].isHovered = true;
    // 保存当前深度
    words[index].originalZ = words[index].z;
    // 将词拉近
    words[index].z += 100;
};

const resetHover = (index) => {
    words[index].isHovered = false;
    // 恢复原始深度
    if (words[index].originalZ !== undefined) {
        words[index].z = words[index].originalZ;
    }
};

// 获取每个词的样式
const getWordStyle = (word) => {
    // 缩放因子基于Z轴位置和屏幕宽度
    const baseSizeScale =
        containerWidth.value < 480
            ? 0.8
            : containerWidth.value < 768
              ? 0.9
              : 1.0;
    const distanceScale = Math.max(0.6, (300 + word.z) / 300) * baseSizeScale;
    const opacity = Math.max(0.7, Math.min(1, distanceScale));
    const zIndex = Math.floor(word.z) + 100;

    return {
        transform: `translate3d(${word.x}px, ${word.y}px, ${word.z}px)
                rotate(${word.angle}deg)
                scale(${word.isHovered ? distanceScale * 1.3 : distanceScale})`,
        fontSize: `${word.size * (containerWidth.value < 480 ? 0.85 : 1)}px`,
        color: word.color,
        fontWeight: word.weight,
        opacity: opacity,
        zIndex: zIndex,
        textShadow: word.isHovered ? `0 0 8px ${word.color}` : "none",
    };
};
</script>

<style scoped>
.cloud-container {
    position: relative;
    width: 100%;
    height: 450px;
    perspective: 1200px;
    overflow: hidden;
    margin: 0 auto;
    pointer-events: none;
}

.cloud {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%) rotateX(23.4deg); /* 黄赤交角 */
    width: 100%;
    height: 100%;
}

.cloud-word {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform-style: preserve-3d;
    transition: all 0.4s ease;
    cursor: pointer;
    pointer-events: auto;
    white-space: nowrap;
    user-select: none;
    will-change: transform;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cloud-word:hover {
    filter: brightness(1.3);
    z-index: 1000 !important;
}

@media (max-width: 768px) {
    .cloud-container {
        height: 400px;
    }
}

@media (max-width: 480px) {
    .cloud-container {
        height: 350px;
    }
}
</style>
