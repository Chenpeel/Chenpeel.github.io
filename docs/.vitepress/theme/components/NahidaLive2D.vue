<template>
    <div id="live2d-container" ref="containerRef" v-if="showLive2D && !isHidden" :style="containerStyle">
        <!-- Live2D模型容器 -->
        <div class="model-viewport" ref="modelViewport">
            <!-- Live2D Canvas将被挂载在这里 -->
        </div>

        <!-- 互动菜单，点击模型后显示 -->
        <div class="interaction-menu" v-if="showMenu" @click.stop>
            <!-- 聊天按钮 -->
            <div class="menu-section">
                <button
                    class="chat-button"
                    @click.stop="openChat"
                    title="与纳西妲聊天"
                >
                    💬 聊天
                </button>
            </div>

            <div class="menu-title">表情</div>
            <div class="menu-items">
                <button
                    v-for="(exp, index) in expressions"
                    :key="'exp-' + index"
                    @click.stop="handleExpressionClick(exp)"
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
                    @click.stop="handleMotionClick(motion)"
                    :title="motion"
                >
                    {{ getMotionEmoji(motion) }}
                </button>
            </div>

            <div class="menu-actions">
                <div class="close-button" @click.stop="closeMenu">关闭菜单</div>
                <div class="hide-button" @click.stop="hideLive2D">隐藏人偶</div>
            </div>
        </div>
    </div>

    <!-- 隐藏后的恢复按钮 -->
    <button v-if="showLive2D && isHidden" class="restore-button" @click="isHidden = false" title="显示纳西妲">
        🌿
    </button>
</template>

<script>
export default {
    name: "NahidaLive2D",
    emits: ['openChat'],
    data() {
        return {
            model: null,
            app: null,
            loadingError: null,
            showLive2D: true, // 控制Live2D显示的标志
            isHidden: false, // 用户手动隐藏人偶
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
            containerPosition: { x: 80, y: 350 }, // container的位置
            modelWidth: 200, // 模型的显示宽度
            isDragging: false, // 是否正在拖拽
            containerSize: { width: 272, height: 400 }, // container的尺寸，使用sidebar的宽度
            dragOffset: { x: 0, y: 0 }, // 拖拽偏移量
            animationFrameId: null, // 动画帧ID
        };
    },
    computed: {
        // 计算container样式
        containerStyle() {
            return {
                left: `${this.containerPosition.x}px`,
                top: `${this.containerPosition.y}px`,
                width: `${this.containerSize.width}px`,
                height: `${this.containerSize.height}px`,
            };
        },
    },
    mounted() {
        // 在客户端环境下加载Live2D
        if (typeof window !== "undefined") {
            // 初始检查窗口宽度
            this.checkWindowWidth();

            // 初始化container位置
            this.initializeContainerPosition();

            // 使用更简化的方式加载脚本
            this.loadAllScriptsSequentially();

            // 添加窗口大小变化监听
            window.addEventListener("resize", this.handleResizeDebounced);

            // 监听全局点击，用于关闭菜单
            document.addEventListener("click", this.handleDocumentClick);
            
            // 添加拖拽事件监听
            this.addDragListeners();
        }
    },
    beforeUnmount() {
        // 移除监听器并清理资源
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", this.handleResizeDebounced);
            document.removeEventListener("click", this.handleDocumentClick);
            this.removeDragListeners();

            // 清理动画帧
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }

            this.clearIntervals();
            this.destroyLive2D();
        }
    },
    methods: {
        // 初始化container位置
        initializeContainerPosition() {
            if (typeof window !== "undefined") {
                this.containerPosition = {
                    x: 80, // 距离左边80px
                    y: Math.max(80, window.innerHeight - 480), // 动态计算，但不少于80px
                };
                // 立即应用到DOM
                this.updateContainerPosition();
            }
        },

        // 直接更新DOM位置（实时跟随）
        updateContainerPosition() {
            if (this.$refs.containerRef) {
                this.$refs.containerRef.style.left = `${this.containerPosition.x}px`;
                this.$refs.containerRef.style.top = `${this.containerPosition.y}px`;
            }
        },

        // 添加拖拽监听器（document 级别的 move/up/end）
        addDragListeners() {
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            document.addEventListener('touchend', this.handleTouchEnd);
        },

        // 在 canvas 上注册 down/start（initLive2D 完成后调用）
        attachCanvasDragListeners() {
            const canvas = this.$refs.modelViewport && this.$refs.modelViewport.querySelector('canvas');
            if (canvas) {
                this._dragCanvas = canvas;
                canvas.addEventListener('mousedown', this.handleMouseDown);
                canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
            }
        },

        // 移除拖拽监听器
        removeDragListeners() {
            if (this._dragCanvas) {
                this._dragCanvas.removeEventListener('mousedown', this.handleMouseDown);
                this._dragCanvas.removeEventListener('touchstart', this.handleTouchStart);
                this._dragCanvas = null;
            }
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            document.removeEventListener('touchmove', this.handleTouchMove);
            document.removeEventListener('touchend', this.handleTouchEnd);
        },

        // 获取事件坐标（统一处理鼠标和触摸事件）
        getEventCoords(e) {
            if (e.touches && e.touches.length > 0) {
                return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
            if (e.changedTouches && e.changedTouches.length > 0) {
                return {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                };
            }
            return {
                x: e.clientX,
                y: e.clientY
            };
        },

        // 处理鼠标按下 - 开始拖拽container
        handleMouseDown(e) {
            this.startDrag(e);
        },

        // 处理触摸开始
        handleTouchStart(e) {
            this.startDrag(e);
        },

        // 开始拖拽
        startDrag(e) {
            // 如果点击的是菜单，不启动拖拽
            if (e.target.closest('.interaction-menu')) {
                return;
            }

            const coords = this.getEventCoords(e);
            
            this.isDragging = true;
            
            // 记录拖拽开始时的精确偏移量
            this.dragOffset = {
                x: coords.x - this.containerPosition.x,
                y: coords.y - this.containerPosition.y,
            };

            // 记录初始点击位置，用于判断是否为点击
            this.initialClickPos = {
                x: coords.x,
                y: coords.y
            };

            // 添加dragging类
            if (this.$refs.containerRef) {
                this.$refs.containerRef.classList.add('dragging');
            }

            // 阻止默认行为和事件冒泡
            if (e.type !== 'touchstart') {
                e.preventDefault();
            }
            e.stopPropagation();
        },

        // 处理鼠标移动 - 拖拽container
        handleMouseMove(e) {
            this.continueDrag(e);
        },

        // 处理触摸移动
        handleTouchMove(e) {
            e.preventDefault();
            this.continueDrag(e);
        },

        // 继续拖拽（实时更新）
        continueDrag(e) {
            if (!this.isDragging) return;

            // 取消之前的动画帧
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }

            // 使用requestAnimationFrame确保平滑更新
            this.animationFrameId = requestAnimationFrame(() => {
                const coords = this.getEventCoords(e);
                
                // 计算新位置 - 无极跟随鼠标
                let newX = coords.x - this.dragOffset.x;
                let newY = coords.y - this.dragOffset.y;

                // 限制在窗口边界内
                const maxX = window.innerWidth - this.containerSize.width;
                const maxY = window.innerHeight - this.containerSize.height;

                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                // 更新位置数据
                this.containerPosition.x = newX;
                this.containerPosition.y = newY;

                // 立即更新DOM（实时跟随）
                this.updateContainerPosition();
            });
        },

        // 处理鼠标释放 - 结束拖拽
        handleMouseUp(e) {
            this.endDrag(e);
        },

        // 处理触摸结束
        handleTouchEnd(e) {
            this.endDrag(e);
        },

        // 结束拖拽
        endDrag(e) {
            if (!this.isDragging) return;

            this.isDragging = false;
            
            // 清理动画帧
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            
            // 移除dragging类
            if (this.$refs.containerRef) {
                this.$refs.containerRef.classList.remove('dragging');
            }

            const coords = this.getEventCoords(e);

            // 检查是否是点击（而不是拖拽）
            const clickThreshold = 3; // 3px的移动阈值
            const moveDistance = Math.sqrt(
                Math.pow(coords.x - this.initialClickPos.x, 2) +
                Math.pow(coords.y - this.initialClickPos.y, 2)
            );

            // 如果移动距离很小，认为是点击
            if (moveDistance < clickThreshold) {
                this.handleContainerClick(e);
            }
        },

        // 处理container点击
        handleContainerClick(e) {
            // 如果点击的是菜单，不处理
            if (e.target && e.target.closest('.interaction-menu')) {
                return;
            }

            console.log("Container被点击");

            // 切换菜单显示状态
            this.showMenu = !this.showMenu;

            // 如果是打开菜单，设置菜单位置
            if (this.showMenu) {
                const coords = this.getEventCoords(e);
                this.lastClickPosition = {
                    x: coords.x,
                    y: coords.y,
                };
            }
        },

        // 处理表情点击 - 立即关闭菜单并设置表情
        handleExpressionClick(exp) {
            this.setExpression(exp);
            this.closeMenu();
        },

        // 处理动作点击 - 立即关闭菜单并播放动作
        handleMotionClick(motion) {
            this.playMotion(motion);
            this.closeMenu();
        },

        // 打开聊天窗口
        openChat() {
            this.closeMenu(); // 立即关闭选项菜单
            this.$emit('openChat'); // 通知父组件打开聊天
            
            // 尝试直接触发聊天组件的打开
            this.$nextTick(() => {
                const event = new CustomEvent('openNahidaChat', {
                    bubbles: true,
                    detail: { fromLive2D: true }
                });
                document.dispatchEvent(event);
            });
        },

        // 关闭菜单
        closeMenu() {
            this.showMenu = false;
        },

        // 隐藏人偶
        hideLive2D() {
            this.showMenu = false;
            this.isHidden = true;
        },

        // 计算模型显示宽度
        calculateModelWidth() {
            if (this.model && this.model.scale) {
                // 基于模型的缩放值和原始尺寸估算显示宽度
                const baseWidth = 300; // 模型原始宽度的估算值
                this.modelWidth = Math.min(baseWidth * this.model.scale.x, 300);
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
            // 如果点击的不是容器内的元素，则关闭菜单
            if (this.showMenu && this.$refs.containerRef && !this.$refs.containerRef.contains(event.target)) {
                this.closeMenu();
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
            // 重新调整container位置，确保在可见区域内
            if (typeof window !== "undefined") {
                const maxX = window.innerWidth - this.containerSize.width;
                const maxY = window.innerHeight - this.containerSize.height;

                this.containerPosition.x = Math.max(0, Math.min(this.containerPosition.x, maxX));
                this.containerPosition.y = Math.max(0, Math.min(this.containerPosition.y, maxY));
                
                // 立即更新DOM位置
                this.updateContainerPosition();
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
            this.closeMenu();

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

                // 创建PIXI应用 - 使用container的尺寸
                this.app = new window.PIXI.Application({
                    width: this.containerSize.width,
                    height: this.containerSize.height,
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

                // 设置尺寸 - 根据container大小调整
                const scaleValue = Math.min(0.08, this.containerSize.height * 0.0002);
                this.model.scale.set(scaleValue);

                // 计算并记录模型显示宽度
                this.calculateModelWidth();

                // 将模型放在container中心
                this.model.x = this.containerSize.width / 2;
                this.model.y = this.containerSize.height / 2;

                console.log(`模型位置: ${this.model.x}, ${this.model.y}`);

                // 添加交互功能
                this.model.buttonMode = true;
                this.model.interactive = true;

                // 添加到舞台
                this.app.stage.addChild(this.model);
                console.log("模型已添加到舞台");

                // 给 canvas 注册拖拽事件（CSS 已设置 pointer-events: auto）
                this.attachCanvasDragListeners();

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
    z-index: 1000;
    pointer-events: none; /* 透明区域穿透，不拦截背后的点击 */
    cursor: move; /* 显示移动光标 */
    border-radius: 12px;
    background: transparent; /* 完全透明背景 */
    border: 0px solid var(--vp-c-brand-1, #52b788); /* 使用VitePress品牌绿色 */
    transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 只对边框和阴影应用过渡，不影响位置 */
    user-select: none; /* 禁用文本选择 */
    will-change: transform; /* 优化GPU加速 */
}

/* 暗色模式下使用对应的绿色 */
.dark #live2d-container {
    border-color: var(--vp-c-green-1, #52b788);
}

#live2d-container:hover {
    border-color: var(--vp-c-brand-2, #52b788);
    box-shadow: 0 0 0 1px var(--vp-c-brand-1, #52b788);
}

.dark #live2d-container:hover {
    border-color: var(--vp-c-green-2, #52b788);
    box-shadow: 0 0 0 1px var(--vp-c-green-1, #52b788);
}

#live2d-container.dragging {
    cursor: grabbing;
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(82, 183, 136, 0.3); /* 绿色阴影 */
    border-color: var(--vp-c-brand-3, #52b788);
    transition: none; /* 拖拽时移除过渡效果，确保实时跟随 */
}

.dark #live2d-container.dragging {
    box-shadow: 0 8px 32px rgba(82, 183, 136, 0.4);
    border-color: var(--vp-c-green-3, #52b788);
}

/* 模型视口，填充整个container */
.model-viewport {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* 让点击事件传递给container */
    border-radius: 10px; /* 比container稍小，避免重叠 */
    overflow: hidden;
}

.model-viewport canvas {
    position: absolute;
    pointer-events: auto; /* canvas接收触摸/点击 */
}

/* 互动菜单样式 */
.interaction-menu {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--vp-c-bg, white);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 16px;
    z-index: 10001;
    pointer-events: auto; /* 菜单可以接收事件 */
    width: 300px; /* 固定宽度300px */
    border: 0px solid var(--vp-c-brand-1, #52b788);
}

/* 暗色模式菜单适配 */
.dark .interaction-menu {
    background-color: var(--vp-c-bg-alt, #161618);
    border-color: var(--vp-c-green-1, #52b788);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* 聊天按钮区域 */
.menu-section {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
}

.dark .menu-section {
    border-bottom-color: var(--vp-c-divider, #2e2e32);
}

.chat-button {
    width: 100%;
    padding: 10px 16px;
    border-radius: 8px;
    border: 2px solid var(--vp-c-brand-1, #52b788);
    background-color: var(--vp-c-brand-1, #52b788);
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.chat-button:hover {
    background-color: var(--vp-c-brand-2, #52b788);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(82, 183, 136, 0.3);
}

.chat-button:active {
    transform: translateY(0);
}

.dark .chat-button {
    border-color: var(--vp-c-green-1, #52b788);
    background-color: var(--vp-c-green-1, #52b788);
}

.dark .chat-button:hover {
    background-color: var(--vp-c-green-2, #52b788);
}

.menu-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--vp-c-text-1, #3c3c43);
    text-align: center;
}

.dark .menu-title {
    color: var(--vp-c-text-1, rgba(255, 255, 245, 0.86));
}

.menu-title:not(:first-child) {
    margin-top: 16px;
}

.menu-items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}

.menu-items button {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-border, #c2c2c4);
    background-color: var(--vp-c-bg, white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s ease;
}

.menu-items button:hover {
    transform: scale(1.1);
    background-color: var(--vp-c-bg-soft, #f6f6f7);
    border-color: var(--vp-c-brand-1, #52b788);
}

.menu-items button:active {
    transform: scale(0.95);
}

.dark .menu-items button {
    background-color: var(--vp-c-bg-alt, #161618);
    border-color: var(--vp-c-border, #3c3f44);
    color: var(--vp-c-text-1, rgba(255, 255, 245, 0.86));
}

.dark .menu-items button:hover {
    background-color: var(--vp-c-bg-soft, #202127);
    border-color: var(--vp-c-green-1, #52b788);
}

/* 菜单底部操作区 */
.menu-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
}

.menu-actions .close-button,
.menu-actions .hide-button {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    border: 1px solid var(--vp-c-border, #c2c2c4);
    color: var(--vp-c-text-1, #3c3c43);
    background-color: var(--vp-c-bg-soft, #f6f6f7);
}

.menu-actions .close-button:hover {
    background-color: var(--vp-c-bg-alt, #f6f6f7);
    border-color: var(--vp-c-brand-1, #52b788);
}

.menu-actions .hide-button:hover {
    background-color: #fff0f0;
    border-color: #e05555;
    color: #e05555;
}

.dark .menu-actions .close-button,
.dark .menu-actions .hide-button {
    background-color: var(--vp-c-bg-soft, #202127);
    color: var(--vp-c-text-1, rgba(255, 255, 245, 0.86));
    border-color: var(--vp-c-border, #3c3f44);
}

.dark .menu-actions .close-button:hover {
    background-color: var(--vp-c-bg-alt, #161618);
    border-color: var(--vp-c-green-1, #52b788);
}

.dark .menu-actions .hide-button:hover {
    background-color: #2a1515;
    border-color: #e05555;
    color: #e05555;
}

/* 隐藏后的恢复按钮 */
.restore-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid var(--vp-c-brand-1, #52b788);
    background-color: var(--vp-c-bg, white);
    cursor: pointer;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(82, 183, 136, 0.25);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.restore-button:hover {
    transform: scale(1.12);
    box-shadow: 0 4px 18px rgba(82, 183, 136, 0.4);
}

.dark .restore-button {
    background-color: var(--vp-c-bg-alt, #161618);
    border-color: var(--vp-c-green-1, #52b788);
}

/* 响应式样式 */
@media (max-width: 768px) {
    #live2d-container {
        /* 在小屏幕上稍微小一点 */
        transform: scale(0.85);
        transform-origin: center;
    }

    #live2d-container.dragging {
        transform: scale(0.87);
    }

    .interaction-menu {
        width: 250px; /* 小屏幕上稍微窄一点 */
        padding: 12px;
    }

    .chat-button {
        padding: 8px 12px;
        font-size: 13px;
    }

    .menu-items button {
        width: 35px;
        height: 35px;
        font-size: 16px;
    }
}

/* 确保在移动设备上的触摸体验 */
@media (hover: none) and (pointer: coarse) {
    #live2d-container {
        cursor: default;
    }

    #live2d-container.dragging {
        cursor: default;
    }
}
</style>