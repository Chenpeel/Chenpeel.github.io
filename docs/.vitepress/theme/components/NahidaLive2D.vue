<template>
    <div id="live2d-container" ref="containerRef"></div>
</template>

<script>
export default {
    name: "NahidaLive2D",
    data() {
        return {
            model: null,
            app: null,
            loadingError: null,
        };
    },
    mounted() {
        // 在客户端环境下加载Live2D
        if (typeof window !== "undefined") {
            // 使用更简化的方式加载脚本
            this.loadAllScriptsSequentially();
        }
    },
    methods: {
        async loadAllScriptsSequentially() {
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

                // 3. 直接加载Live2D Display库，省略中间模块
                // 这是简化后的脚本加载，省略了@pixi/utils和@pixi/math
                await this.loadScriptPromise(
                    "https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.0/dist/cubism4.min.js",
                );
                console.log("✓ PIXI Live2D Display 已加载");

                // 全部加载完成后，初始化模型
                console.log("所有脚本加载完成，开始初始化Live2D模型...");
                await this.initLive2D();
            } catch (error) {
                this.loadingError = error;
                console.error("加载Live2D脚本失败:", error);
            }
        },
        loadScriptPromise(url) {
            return new Promise((resolve, reject) => {
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
            try {
                // 检查PIXI是否存在
                if (!window.PIXI) {
                    throw new Error("PIXI.js 未加载，无法初始化模型");
                }

                // 检查Live2D模块是否存在
                if (!window.PIXI.live2d) {
                    throw new Error("PIXI Live2D 模块未正确加载");
                }

                console.log("开始创建PIXI应用...");
                // 创建PIXI应用
                this.app = new window.PIXI.Application({
                    width: 300,
                    height: 400,
                    backgroundColor: 0x0f0f0f,
                    transparent: true,
                    antialias: true,
                    autoStart: true,
                });

                // 挂载到DOM
                if (this.$refs.containerRef) {
                    this.$refs.containerRef.appendChild(this.app.view);
                    console.log("PIXI应用已挂载到DOM");
                } else {
                    throw new Error("容器引用不存在，无法挂载模型");
                }

                // 设置模型路径
                // 注意：在VitePress中，public目录会被映射到根路径
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
                const scale = 0.078;
                this.model.scale.set(scale);
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

/* 可选：添加一些响应式样式 */
@media (max-width: 768px) {
    #live2d-container {
        width: 200px;
        height: 300px;
    }
}
</style>
