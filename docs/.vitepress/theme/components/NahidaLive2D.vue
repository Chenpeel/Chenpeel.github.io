<template>
    <div id="live2d-container" ref="containerRef" v-if="showLive2D">
        <!-- Live2D模型容器，覆盖整个视口 -->
        <div class="model-viewport" ref="modelViewport">
            <!-- Live2D Canvas将被挂载在这里 -->
        </div>

        <!-- 互动菜单，点击模型后显示 -->
        <div class="interaction-menu" v-if="showMenu" @click.stop>
            <div class="menu-title">表情</div>
            <div class="menu-items">
                <button
                    v-for="(exp, index) in expressions"
                    :key="'exp-' + index"
                    @click.stop="setExpression(exp)"
                    :title="exp"
                >
                    {{ getExpressionEmoji(exp) }}
                </button>
            </div>

            <div class="menu-title">动作</div>
            <div class="menu-items">
                <button
                    v-for="(motion, index) in motions"
                    :key="'motion-' + index"
                    @click.stop="playMotion(motion)"
                    :title="motion"
                >
                    {{ getMotionEmoji(motion) }}
                </button>
            </div>

            <div class="close-button" @click.stop="showMenu = false">关闭</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NahidaLive2D",
    data() {
        return {
            model: null,
            app: null,
            loadingError: null,
            showLive2D: true, // 控制Live2D显示的标志
            minWidthToShow: 360, // 最小显示宽度
            resizeTimer: null, // 用于防抖处理
            expressions: [
                "default",
                "black",
                "shy",
                "angry",
                "star",
                "tear",
                "pose1",
                "pose2",
                "pose3",
                "leaf",
                "shine",
            ],
            motions: ["standby", "1"],
            showMenu: false, // 控制互动菜单显示状态
            expressionInterval: null, // 自动切换表情的计时器
            motionInterval: null, // 自动播放动作的计时器
            lastClickPosition: { x: 0, y: 0 }, // 记录最后点击位置
            modelPosition: { x: 0, y: 0 }, // 模型在视口中的位置
            modelRelativePosition: { x: 0.1, y: 0.8 }, // 模型相对于视口的位置比例 (0.1, 0.8 表示左下角)
        };
    },
    mounted() {
        // 在客户端环境下加载Live2D
        if (typeof window !== "undefined") {
            // 初始检查窗口宽度
            this.checkWindowWidth();

            // 使用更简化的方式加载脚本
            this.loadAllScriptsSequentially();

            // 添加窗口大小变化监听
            window.addEventListener("resize", this.handleResizeDebounced);

            // 监听全局点击，用于关闭菜单
            document.addEventListener("click", this.handleDocumentClick);

            // 添加悬停事件监听器，以便使模型可见
            if (this.$refs.containerRef) {
                this.$refs.containerRef.addEventListener(
                    "mouseenter",
                    this.handleContainerHover,
                );
            }
        }
    },
    beforeUnmount() {
        // 移除监听器并清理资源
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", this.handleResizeDebounced);
            document.removeEventListener("click", this.handleDocumentClick);

            if (this.$refs.containerRef) {
                this.$refs.containerRef.removeEventListener(
                    "mouseenter",
                    this.handleContainerHover,
                );
            }

            this.clearIntervals();
            this.destroyLive2D();
        }
    },
    methods: {
        // 处理容器悬停 - 提高z-index使模型在最上层
        handleContainerHover() {
            if (this.$refs.containerRef) {
                this.$refs.containerRef.classList.add("hover");
            }
        },

        // 根据表情名称返回对应的emoji
        getExpressionEmoji(expression) {
            const emojiMap = {
                default: "😊",
                black: "😶",
                shy: "😳",
                angry: "😠",
                star: "🌟",
                tear: "😢",
                pose1: "🤔",
                pose2: "🙂",
                pose3: "😄",
                leaf: "🍃",
                shine: "✨",
            };
            return emojiMap[expression] || "😊";
        },

        // 根据动作名称返回对应的emoji
        getMotionEmoji(motion) {
            const emojiMap = {
                standby: "🧘‍♀️",
                1: "🎭",
            };
            return emojiMap[motion] || "🎬";
        },

        // 计算模型在视口中的位置
        calculateModelPosition() {
            if (!this.$refs.modelViewport) return { x: 0, y: 0 };

            const viewport = this.$refs.modelViewport;
            const viewportWidth = viewport.clientWidth;
            const viewportHeight = viewport.clientHeight;

            // 基于相对位置比例计算实际像素位置
            return {
                x: viewportWidth * this.modelRelativePosition.x,
                y: viewportHeight * this.modelRelativePosition.y,
            };
        },

        // 更新模型相对位置比例
        updateModelRelativePosition() {
            if (!this.model || !this.$refs.modelViewport) return;

            const viewport = this.$refs.modelViewport;
            const viewportWidth = viewport.clientWidth;
            const viewportHeight = viewport.clientHeight;

            // 计算相对位置比例
            this.modelRelativePosition = {
                x: this.model.x / viewportWidth,
                y: this.model.y / viewportHeight,
            };
        },

        // 设置表情
        setExpression(expressionName) {
            if (!this.model || !this.model.internalModel) {
                console.error("模型未加载，无法设置表情");
                return;
            }

            try {
                // 清除自动表情切换
                this.clearExpressionInterval();

                console.log(`尝试设置表情: ${expressionName}`);

                // 处理default表情（重置为默认表情）
                if (expressionName === "default") {
                    this.model.expression();
                    console.log("重置为默认表情");
                } else {
                    // 设置指定表情
                    this.model.expression(expressionName);
                    console.log(`设置表情: ${expressionName}`);
                }
            } catch (error) {
                console.error(`设置表情失败: ${expressionName}`, error);
            }
        },

        // 播放动作
        playMotion(motionName) {
            if (!this.model || !this.model.internalModel) {
                console.error("模型未加载，无法播放动作");
                return;
            }

            try {
                // 清除自动动作播放
                this.clearMotionInterval();

                console.log(`尝试播放动作: ${motionName}`);

                // 播放指定动作
                this.model.motion(motionName);
                console.log(`播放动作: ${motionName}`);
            } catch (error) {
                console.error(`播放动作失败: ${motionName}`, error);
            }
        },

        // 启动自动表情切换
        startRandomExpressions() {
            this.clearExpressionInterval();
            this.expressionInterval = setInterval(() => {
                const randomIndex = Math.floor(
                    Math.random() * this.expressions.length,
                );
                this.setExpression(this.expressions[randomIndex]);
            }, 8000); // 每8秒切换一次
        },

        // 清除表情自动切换
        clearExpressionInterval() {
            if (this.expressionInterval) {
                clearInterval(this.expressionInterval);
                this.expressionInterval = null;
            }
        },

        // 启动自动动作播放
        startRandomMotions() {
            this.clearMotionInterval();
            this.motionInterval = setInterval(() => {
                const randomIndex = Math.floor(
                    Math.random() * this.motions.length,
                );
                this.playMotion(this.motions[randomIndex]);
            }, 15000); // 每15秒播放一次
        },

        // 清除动作自动播放
        clearMotionInterval() {
            if (this.motionInterval) {
                clearInterval(this.motionInterval);
                this.motionInterval = null;
            }
        },

        // 清除所有自动切换定时器
        clearIntervals() {
            this.clearExpressionInterval();
            this.clearMotionInterval();
        },

        // 处理全局点击，关闭菜单
        handleDocumentClick(event) {
            // 如果点击的不是菜单内的元素，则关闭菜单
            if (this.showMenu && this.$refs.containerRef) {
                const menu =
                    this.$refs.containerRef.querySelector(".interaction-menu");
                // 获取所有canvas元素而非单一的canvas
                const canvasElements =
                    this.$refs.containerRef.querySelectorAll("canvas");
                let clickedOnCanvas = false;

                // 检查点击是否在任何canvas上
                canvasElements.forEach((canvas) => {
                    if (canvas.contains(event.target)) {
                        clickedOnCanvas = true;
                    }
                });

                if (menu && !menu.contains(event.target) && !clickedOnCanvas) {
                    this.showMenu = false;
                }
            }
        },

        // 检查窗口宽度，决定是否显示Live2D
        checkWindowWidth() {
            if (typeof window !== "undefined") {
                const shouldShow = window.innerWidth >= this.minWidthToShow;

                // 如果状态变化，需要做相应处理
                if (shouldShow !== this.showLive2D) {
                    // 如果从显示变为不显示，先销毁资源
                    if (!shouldShow && this.showLive2D) {
                        this.clearIntervals();
                        this.destroyLive2D();
                    }

                    // 更新状态
                    this.showLive2D = shouldShow;
                }
            }
        },

        // 使用防抖处理resize事件，避免频繁触发渲染
        handleResizeDebounced() {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250); // 250ms延迟
        },

        handleResize() {
            // 如果模型存在，先保存当前的相对位置
            if (this.model && this.$refs.modelViewport) {
                this.updateModelRelativePosition();
            }

            // 先清理之前可能存在的任何Live2D资源
            this.clearIntervals();
            this.destroyLive2D();

            // 然后检查是否应该显示
            this.checkWindowWidth();

            // 如果应该显示，则初始化
            if (this.showLive2D) {
                // 延迟一点再初始化，确保销毁操作完成
                setTimeout(() => {
                    this.initLive2D();
                }, 100);
            }
        },

        // 彻底销毁Live2D应用
        destroyLive2D() {
            // 关闭菜单
            this.showMenu = false;

            // 销毁所有PIXI相关资源
            if (this.app) {
                console.log("正在销毁Live2D资源...");

                // 停止所有可能的动画
                if (
                    this.model &&
                    this.model.internalModel &&
                    this.model.internalModel.motionManager
                ) {
                    this.model.internalModel.motionManager.stopAllMotions();
                }

                // 解除所有模型相关资源
                if (this.model) {
                    // 移除所有事件监听器
                    this.model.removeAllListeners();

                    // 从舞台移除
                    if (this.app.stage && this.model.parent) {
                        this.model.parent.removeChild(this.model);
                    }

                    // 销毁模型特定资源
                    if (this.model.destroy) {
                        this.model.destroy({ children: true });
                    }

                    // 如果有Cubism特定的资源释放方法，调用它
                    if (
                        this.model.internalModel &&
                        this.model.internalModel.release
                    ) {
                        this.model.internalModel.release();
                    }

                    this.model = null;
                }

                // 销毁PIXI应用
                this.app.destroy(true, {
                    children: true,
                    texture: true,
                    baseTexture: true,
                });

                this.app = null;

                // 尝试清除全局纹理缓存
                if (window.PIXI && window.PIXI.utils) {
                    if (window.PIXI.utils.TextureCache) {
                        Object.keys(window.PIXI.utils.TextureCache).forEach(
                            (key) => {
                                delete window.PIXI.utils.TextureCache[key];
                            },
                        );
                    }
                    if (window.PIXI.utils.BaseTextureCache) {
                        Object.keys(window.PIXI.utils.BaseTextureCache).forEach(
                            (key) => {
                                delete window.PIXI.utils.BaseTextureCache[key];
                            },
                        );
                    }
                }

                // 清空模型容器
                if (this.$refs.modelViewport) {
                    this.$refs.modelViewport.innerHTML = "";
                }

                // 强制进行垃圾回收（虽然我们不能直接调用，但可以尝试帮助GC）
                this.model = null;
                this.app = null;

                console.log("Live2D资源销毁完成");
            }
        },

        async loadAllScriptsSequentially() {
            // 如果窗口太窄，不加载Live2D
            if (!this.showLive2D) return;

            try {
                console.log("开始加载Live2D相关脚本...");

                // 1. 先加载核心库
                await this.loadScriptPromise(
                    "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
                );
                console.log("✓ Cubism Core 已加载");

                // 2. 加载PIXI.js主库
                await this.loadScriptPromise(
                    "https://cdn.jsdelivr.net/npm/pixi.js@6.5.2/dist/browser/pixi.min.js",
                );
                console.log("✓ PIXI.js 已加载");

                // 确保PIXI已正确加载
                if (!window.PIXI) {
                    throw new Error("PIXI.js 没有正确加载，window.PIXI 不存在");
                }

                // 3. 直接加载Live2D Display库
                await this.loadScriptPromise(
                    "https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.0/dist/cubism4.min.js",
                );
                console.log("✓ PIXI Live2D Display 已加载");

                // 全部加载完成后，初始化模型
                console.log("所有脚本加载完成，开始初始化Live2D模型...");
                // 再次检查窗口宽度，确保窗口足够宽才初始化模型
                this.checkWindowWidth();
                if (this.showLive2D) {
                    await this.initLive2D();
                }
            } catch (error) {
                this.loadingError = error;
                console.error("加载Live2D脚本失败:", error);
            }
        },

        loadScriptPromise(url) {
            return new Promise((resolve, reject) => {
                // 检查是否已加载
                const existingScript = document.querySelector(
                    `script[src="${url}"]`,
                );
                if (existingScript) {
                    console.log(`脚本已存在: ${url}`);
                    return resolve();
                }

                const script = document.createElement("script");
                script.src = url;
                script.async = false; // 确保按顺序加载

                script.onload = () => {
                    console.log(`脚本加载成功: ${url}`);
                    resolve();
                };
                script.onerror = (err) => {
                    console.error(`脚本加载失败: ${url}`, err);
                    reject(new Error(`无法加载脚本: ${url}`));
                };
                document.head.appendChild(script);
            });
        },

        async initLive2D() {
            // 如果窗口太窄或已经存在应用，则不初始化
            if (!this.showLive2D) return;
            if (this.app) {
                console.warn("存在旧的PIXI应用，先销毁它");
                this.destroyLive2D();
            }

            try {
                console.log("开始初始化Live2D...");

                // 检查PIXI是否存在
                if (!window.PIXI) {
                    throw new Error("PIXI.js 未加载，无法初始化模型");
                }

                // 检查Live2D模块是否存在
                if (!window.PIXI.live2d) {
                    throw new Error("PIXI Live2D 模块未正确加载");
                }

                // 确保容器存在且为空
                if (!this.$refs.modelViewport) {
                    throw new Error("模型视口容器引用不存在，无法挂载模型");
                }
                this.$refs.modelViewport.innerHTML = "";

                // 获取视口尺寸
                const viewportWidth = this.$refs.modelViewport.clientWidth;
                const viewportHeight = this.$refs.modelViewport.clientHeight;

                // 创建PIXI应用 - 尺寸等于视口大小
                this.app = new window.PIXI.Application({
                    width: viewportWidth,
                    height: viewportHeight,
                    backgroundColor: 0x0f0f0f,
                    transparent: true,
                    antialias: true,
                    autoStart: true,
                });

                // 挂载到DOM
                this.$refs.modelViewport.appendChild(this.app.view);
                console.log("PIXI应用已挂载到DOM");

                // 设置模型路径
                const modelPath = "/images/live2d/nahida/nahida.model3.json";
                console.log("开始加载模型:", modelPath);

                // 检查Live2DModel方法是否存在
                if (
                    !window.PIXI.live2d.Live2DModel ||
                    !window.PIXI.live2d.Live2DModel.from
                ) {
                    throw new Error("PIXI.live2d.Live2DModel.from 方法不存在");
                }

                // 加载Cubism 4模型
                this.model =
                    await window.PIXI.live2d.Live2DModel.from(modelPath);
                console.log("模型加载成功!", this.model);

                // 配置模型显示
                this.model.anchor.set(0.5, 0.5);

                // 设置尺寸，根据视口大小缩放
                let scaleValue;
                if (viewportWidth <= 768) {
                    // 在小屏幕上使用稍小的缩放
                    scaleValue = Math.min(0.065, viewportHeight * 0.0002);
                } else {
                    // 在大屏幕上使用正常缩放
                    scaleValue = Math.min(0.078, viewportHeight * 0.00025);
                }
                this.model.scale.set(scaleValue);

                // 计算模型位置 - 使用相对位置
                const modelPos = this.calculateModelPosition();
                this.model.x = modelPos.x;
                this.model.y = modelPos.y;

                console.log(`模型位置: ${this.model.x}, ${this.model.y}`);

                // 确保canvas可以被点击
                const canvas = this.$refs.modelViewport.querySelector("canvas");
                if (canvas) {
                    canvas.style.pointerEvents = "auto";
                }

                // 添加交互功能
                this.model.buttonMode = true;
                this.model.interactive = true;

                // 添加点击效果 - 显示互动菜单
                this.model.on("pointerdown", (e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    console.log("模型被点击");

                    // 确保容器在最上层
                    if (this.$refs.containerRef) {
                        this.$refs.containerRef.classList.add("hover");
                    }

                    // 记录点击位置，用于定位菜单
                    this.lastClickPosition = {
                        x: e.data.global.x,
                        y: e.data.global.y,
                    };

                    // 切换菜单显示状态
                    this.showMenu = !this.showMenu;

                    // 如果是打开菜单，设置菜单位置
                    if (this.showMenu) {
                        // 在下一个tick中设置位置，确保菜单已渲染
                        this.$nextTick(() => {
                            const menu =
                                this.$refs.containerRef.querySelector(
                                    ".interaction-menu",
                                );
                            if (menu) {
                                // 根据点击位置调整菜单位置
                                menu.style.left = `${e.data.global.x}px`;
                                menu.style.top = `${e.data.global.y}px`;
                            }
                        });
                    }

                    // 开始拖动操作
                    this.model.dragging = true;
                    this.model._dragOffset = {
                        x: e.data.global.x - this.model.x,
                        y: e.data.global.y - this.model.y,
                    };

                    // 触发自定义事件
                    const event = new CustomEvent("nahidaClick", {
                        bubbles: true,
                        detail: { x: e.data.global.x, y: e.data.global.y },
                    });
                    this.$refs.containerRef.dispatchEvent(event);
                });

                // 添加拖拽功能
                this.model.on("pointermove", (e) => {
                    if (this.model.dragging) {
                        this.model.x =
                            e.data.global.x - this.model._dragOffset.x;
                        this.model.y =
                            e.data.global.y - this.model._dragOffset.y;

                        // 拖动时更新相对位置
                        this.updateModelRelativePosition();
                    }
                });

                this.model.on("pointerupoutside", () => {
                    this.model.dragging = false;
                });

                this.model.on("pointerup", () => {
                    this.model.dragging = false;
                });

                // 添加到舞台
                this.app.stage.addChild(this.model);
                console.log("模型已添加到舞台");

                // 设置初始表情
                setTimeout(() => {
                    // 启动随机表情和动作
                    this.startRandomExpressions();
                    this.startRandomMotions();
                }, 1000);
            } catch (error) {
                console.error("模型初始化失败:", error);
            }
        },
    },
};
</script>
<style scoped>
#live2d-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw; /* 覆盖整个视口宽度 */
    height: 100vh; /* 覆盖整个视口高度 */
    pointer-events: none; /* 默认不捕获事件 */
    z-index: 1000;
    overflow: hidden;
}

/* 当处于hover或交互状态时，提高z-index */
#live2d-container.hover {
    z-index: 10000;
}

/* 模型视口，覆盖整个容器 */
.model-viewport {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.model-viewport canvas {
    position: absolute;
    pointer-events: auto; /* 确保canvas可以接收点击事件 */
}

/* 互动菜单样式 */
.interaction-menu {
    position: fixed; /* 使用fixed定位，相对于视口 */
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 12px;
    z-index: 10001; /* 确保在canvas上方 */
    pointer-events: auto;
    min-width: 180px;
    transform: translate(-50%, -100%); /* 定位到鼠标点击位置的上方 */
    margin-top: -10px; /* 稍微向上偏移 */
}

.menu-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
}

.menu-title:not(:first-child) {
    margin-top: 12px;
}

.menu-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.menu-items button {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s;
}

.menu-items button:hover {
    transform: scale(1.1);
    background-color: #f5f5f5;
}

.close-button {
    text-align: center;
    margin-top: 12px;
    padding: 6px 0;
    background-color: #f0f0f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.close-button:hover {
    background-color: #e0e0e0;
}

/* 响应式样式 */
@media (max-width: 768px) {
    .interaction-menu {
        padding: 8px;
        min-width: 150px;
    }

    .menu-items button {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
    .interaction-menu {
        background-color: rgba(40, 40, 40, 0.9);
    }

    .menu-title {
        color: #f0f0f0;
    }

    .menu-items button {
        background-color: #444;
        border-color: #555;
        color: #fff;
    }

    .menu-items button:hover {
        background-color: #555;
    }

    .close-button {
        background-color: #333;
        color: #f0f0f0;
    }

    .close-button:hover {
        background-color: #444;
    }
}
</style>
