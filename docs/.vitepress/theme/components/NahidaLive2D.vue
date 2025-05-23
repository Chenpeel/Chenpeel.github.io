<template>
    <!-- 使用v-if替代v-show，确保DOM元素完全移除和重建 -->
    <div id="live2d-container" ref="containerRef" v-if="showLive2D"></div>
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
        }
    },
    beforeUnmount() {
        // 移除监听器并清理资源
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", this.handleResizeDebounced);
            this.destroyLive2D();
        }
    },
    methods: {
        // 检查窗口宽度，决定是否显示Live2D
        checkWindowWidth() {
            if (typeof window !== "undefined") {
                const shouldShow = window.innerWidth >= this.minWidthToShow;

                // 如果状态变化，需要做相应处理
                if (shouldShow !== this.showLive2D) {
                    // 如果从显示变为不显示，先销毁资源
                    if (!shouldShow && this.showLive2D) {
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
            // 先清理之前可能存在的任何Live2D资源
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

                // 清空DOM容器
                if (this.$refs.containerRef) {
                    this.$refs.containerRef.innerHTML = "";
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
                if (!this.$refs.containerRef) {
                    throw new Error("容器引用不存在，无法挂载模型");
                }
                this.$refs.containerRef.innerHTML = "";

                // 根据屏幕宽度设置模型大小
                let modelWidth = 300;
                let modelHeight = 400;
                // 响应式调整
                let scaleValue = 0.078; // 默认缩放
                if (window.innerWidth <= 768) {
                    modelWidth = Math.min(window.innerWidth * 0.4, 200);
                    modelHeight = modelWidth * 1.5;
                    scaleValue = 0.065; // 手机上适当调小
                }

                // 创建PIXI应用
                this.app = new window.PIXI.Application({
                    width: modelWidth,
                    height: modelHeight,
                    backgroundColor: 0x0f0f0f,
                    transparent: true,
                    antialias: true,
                    autoStart: true,
                });

                // 挂载到DOM
                this.$refs.containerRef.appendChild(this.app.view);
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

                // 配置模型显示 - 只在这里设置一次scale
                this.model.anchor.set(0.5, 0.5);
                this.model.scale.set(scaleValue); // 使用之前根据屏幕宽度计算的scaleValue
                this.model.x = this.app.renderer.width / 2;
                this.model.y = this.app.renderer.height / 2 + 15;

                // 添加交互功能
                this.model.buttonMode = true;
                this.model.interactive = true;

                // 添加点击效果
                this.model.on("pointerdown", (e) => {
                    this.model.dragging = true;
                    this.model._dragOffset = {
                        x: e.data.global.x - this.model.x,
                        y: e.data.global.y - this.model.y,
                    };

                    // 随机触发动作
                    if (
                        this.model.internalModel &&
                        this.model.internalModel.motionManager
                    ) {
                        const groups = Object.keys(
                            this.model.internalModel.settings.motions || {},
                        );
                        if (groups.length > 0) {
                            const randomGroup =
                                groups[
                                    Math.floor(Math.random() * groups.length)
                                ];
                            console.log("播放动作组:", randomGroup);
                            this.model.motion(randomGroup);
                        }
                    }

                    // 触发自定义事件，通知外部组件看板娘被点击
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
    left: 0; /* 从right: 0改为left: 0 */
    bottom: 0;
    width: 300px;
    height: 400px;
    pointer-events: none;
    z-index: 1000;
}

#live2d-container canvas {
    position: absolute;
    left: 0; /* 从right: 0改为left: 0 */
    bottom: 0;
    pointer-events: auto;
}

/* 响应式样式 */
@media (max-width: 768px) {
    #live2d-container {
        width: 40vw; /* 使用视口宽度的百分比 */
        height: 60vw; /* 保持比例 */
        max-width: 200px; /* 设置最大宽度 */
        max-height: 300px;
    }
}
</style>
