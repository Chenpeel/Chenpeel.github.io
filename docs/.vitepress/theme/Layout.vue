<script setup>
import { ref, provide, onMounted, shallowRef } from "vue";
import DefaultTheme from "vitepress/theme";
import NahidaLive2D from "./components/NahidaLive2D.vue";
import NahidaChat from "./components/NahidaChat.vue";
import { watch } from "vue";

const { Layout } = DefaultTheme;
const showComponents = ref(false);
const apiUrl = "http://localhost:8812/api/chat"; // 您的API URL

// 创建聊天历史记录 ref
const chatHistory = ref([]);

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
                <NahidaLive2D v-if="showComponents" />
                <NahidaChat
                    v-if="showComponents"
                    :api-url="apiUrl"
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
