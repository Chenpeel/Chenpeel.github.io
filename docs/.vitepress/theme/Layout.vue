<script setup>
import {
    ref,
    provide,
    onMounted,
    onBeforeUnmount,
    defineAsyncComponent,
    watch,
} from "vue";
import DefaultTheme from "vitepress/theme";
import NahidaChat from "./components/NahidaChat.vue";

const { Layout } = DefaultTheme;
const showComponents = ref(false);
const showLive2D = ref(false);
const LIVE2D_MIN_WIDTH = 1024;
const LIVE2D_MEDIA_QUERY = `(min-width: ${LIVE2D_MIN_WIDTH}px) and (hover: hover) and (pointer: fine)`;
const NahidaLive2DAsync = defineAsyncComponent(() =>
    import("./components/NahidaLive2D.vue"),
);
let live2DMediaQuery = null;

// 创建聊天历史记录 ref
const chatHistory = ref([]);

// 创建聊天组件的引用
const nahidaChatRef = ref(null);

// 处理来自Live2D的打开聊天事件
const handleOpenChat = () => {
    console.log("接收到来自Live2D的打开聊天请求");
    if (nahidaChatRef.value && nahidaChatRef.value.openChat) {
        nahidaChatRef.value.openChat();
    }
};

const updateLive2DVisibility = (matches) => {
    showLive2D.value = matches;
};

const handleLive2DMediaQueryChange = (event) => {
    updateLive2DVisibility(event.matches);
};

// 确保只在客户端渲染
onMounted(() => {
    showComponents.value = true;

    // 仅在桌面宽屏设备上加载 Live2D，避免手机和平板初始化额外脚本
    if (typeof window !== "undefined") {
        live2DMediaQuery = window.matchMedia(LIVE2D_MEDIA_QUERY);
        updateLive2DVisibility(live2DMediaQuery.matches);

        if (live2DMediaQuery.addEventListener) {
            live2DMediaQuery.addEventListener("change", handleLive2DMediaQueryChange);
        } else {
            live2DMediaQuery.addListener(handleLive2DMediaQueryChange);
        }
    }

    // 在客户端挂载后加载历史记录
    try {
        const savedHistory = localStorage.getItem("nahidaChatHistory");
        if (savedHistory) {
            chatHistory.value = JSON.parse(savedHistory);
        }

        // 当历史记录变化时保存到localStorage
        watch(
            chatHistory,
            (newHistory) => {
                localStorage.setItem(
                    "nahidaChatHistory",
                    JSON.stringify(newHistory),
                );
            },
            { deep: true },
        );
    } catch (error) {
        console.error("无法加载聊天历史:", error);
    }
});

onBeforeUnmount(() => {
    if (!live2DMediaQuery) {
        return;
    }

    if (live2DMediaQuery.removeEventListener) {
        live2DMediaQuery.removeEventListener("change", handleLive2DMediaQueryChange);
    } else {
        live2DMediaQuery.removeListener(handleLive2DMediaQueryChange);
    }

    live2DMediaQuery = null;
});

// 提供聊天历史给子组件
provide("chatHistory", chatHistory);

// 替代ClientOnly的方法
const isBrowser = typeof window !== "undefined";
</script>

<template>
    <Layout>
        <template #layout-bottom>
            <!-- 使用简单的条件渲染替代ClientOnly -->
            <div v-if="isBrowser">
                <NahidaLive2DAsync
                    v-if="showComponents && showLive2D"
                    :min-width-to-show="LIVE2D_MIN_WIDTH"
                    @openChat="handleOpenChat"
                />
                <NahidaChat
                    v-if="showComponents"
                    ref="nahidaChatRef"
                    :initial-open="false"
                />
            </div>
        </template>
    </Layout>
</template>
<style scoped>
.nahida-components-container {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    z-index: 1000;
}
</style>
