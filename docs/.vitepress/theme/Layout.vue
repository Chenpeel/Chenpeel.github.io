<script setup>
import { ref, provide, onMounted, shallowRef } from "vue";
import DefaultTheme from "vitepress/theme";
import NahidaLive2D from "./components/NahidaLive2D.vue";
import NahidaChat from "./components/NahidaChat.vue";
import { watch } from "vue";

const { Layout } = DefaultTheme;
const showComponents = ref(false);

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

// 确保只在客户端渲染
onMounted(() => {
    showComponents.value = true;

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
                <NahidaLive2D 
                    v-if="showComponents" 
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
