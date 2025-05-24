<template>
    <div class="nahida-chat-container" :class="{ 'chat-open': isChatOpen }">
        <!-- 聊天图标按钮 - 可以通过看板娘或此按钮触发聊天 -->
        <div class="chat-trigger" @click="toggleChat" v-if="!isChatOpen">
            <svg viewBox="0 0 24 24" class="chat-icon">
                <path
                    fill="currentColor"
                    d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20V16Z"
                />
            </svg>
        </div>

        <!-- 聊天窗口 -->
        <div
            class="chat-window"
            v-if="isChatOpen"
            ref="chatWindowRef"
            @click.stop
            @dblclick.stop="handleDoubleClick"
        >
            <!-- 聊天窗口标题栏 -->
            <div class="chat-header">
                <div class="chat-title">我等你好久啦</div>
                <div class="chat-actions">
                    <button
                        class="clear-history-btn"
                        @click="clearHistory"
                        title="清除聊天记录"
                    >
                        <svg viewBox="0 0 24 24" class="clear-icon">
                            <path
                                fill="currentColor"
                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                            />
                        </svg>
                    </button>
                    <div class="chat-close" @click="toggleChat">×</div>
                </div>
            </div>

            <!-- 聊天消息区域 -->
            <div class="chat-messages" ref="chatMessagesRef">
                <!-- 欢迎消息 -->
                <div class="message system">
                    <div class="message-content">
                        你好啊～ 我是纳西妲。有什么我可以帮助你的吗？
                        <div class="message-time">
                            {{ formatTime(systemMessageTime) }}
                        </div>
                    </div>
                </div>

                <!-- 聊天历史 -->
                <template v-for="(message, index) in chatHistory" :key="index">
                    <!-- 用户消息 -->
                    <div class="message user" v-if="message.role === 'user'">
                        <div class="message-content">
                            {{ message.content }}
                            <div class="message-time">
                                {{ formatTime(message.timestamp) }}
                            </div>
                        </div>
                    </div>

                    <!-- AI回复 -->
                    <div
                        class="message ai"
                        v-else-if="message.role === 'assistant'"
                    >
                        <div class="avatar">
                            <img
                                src="/images/live2d/nahida.jpg"
                                alt="Nahida"
                                onerror="this.src='/images/live2d/nahida/textures/texture_00.png'"
                            />
                        </div>
                        <div class="message-content">
                            <div v-html="formatMessage(message.content)"></div>
                            <div class="message-time">
                                {{ formatTime(message.timestamp) }}
                            </div>
                        </div>
                    </div>
                </template>

                <!-- 加载状态 -->
                <div class="message ai" v-if="isLoading">
                    <div class="avatar">
                        <img
                            src="/images/live2d/nahida.jpg"
                            alt="Nahida"
                            onerror="this.src='/images/live2d/nahida/textures/texture_00.png'"
                        />
                    </div>
                    <div class="message-content">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 输入区域 -->
            <div class="chat-input-container">
                <textarea
                    class="chat-input"
                    v-model="userInput"
                    @keydown.enter.prevent="handleEnter"
                    placeholder="输入消息..."
                    ref="inputRef"
                    :disabled="isLoading"
                ></textarea>
                <button
                    class="send-button"
                    @click="sendMessage"
                    :disabled="!userInput.trim() || isLoading"
                >
                    <svg viewBox="0 0 24 24" class="send-icon">
                        <path
                            fill="currentColor"
                            d="M2,21L23,12L2,3V10L17,12L2,14V21Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, onUnmounted, nextTick, watch, inject } from "vue"; // 添加 inject
import { marked } from "marked";

export default {
    name: "NahidaChat",
    props: {
        // 在点击看板娘时，父组件可以通过这个属性打开聊天窗口
        initialOpen: {
            type: Boolean,
            default: false,
        },
        // 后端API地址
        apiUrl: {
            type: String,
            default: "https://api.chenpeel.xyz/chat",
        },
    },

    setup(props, { emit }) {
        // 使用注入的聊天历史
        const chatHistory = inject("chatHistory", ref([]));
        const isChatOpen = ref(props.initialOpen);
        const userInput = ref("");
        const isLoading = ref(false);
        const chatMessagesRef = ref(null);
        const inputRef = ref(null);
        const sessionId = ref(
            localStorage.getItem("nahida_session_id") || generateUUID(),
        );
        const chatWindowRef = ref(null);
        // 系统消息的时间戳（初始化为当前时间）
        const systemMessageTime = ref(new Date().toISOString());

        function generateUUID() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = (Math.random() * 16) | 0,
                        v = c == "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                },
            );
        }
        function saveSessionId(id) {
            sessionId.value = id;
            localStorage.setItem("nahida_session_id", id);
        }

        // 处理双击事件 - 阻止默认行为
        const handleDoubleClick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // 不执行任何缩小操作
        };

        onUnmounted(() => {
            saveSessionId(sessionId.value);
            document.removeEventListener("click", handleOutsideClick);
            // 移除自定义事件监听
            document.removeEventListener("openNahidaChat", handleOpenChatEvent);
        });

        // 检查聊天历史中的消息是否都有时间戳
        chatHistory.value.forEach((message) => {
            if (!message.timestamp) {
                message.timestamp = new Date().toISOString();
            }
        });

        // 处理来自Live2D的打开聊天事件
        const handleOpenChatEvent = (event) => {
            console.log("收到打开聊天事件", event.detail);
            isChatOpen.value = true;
            emit("toggle", true);
        };

        // 处理外部点击事件
        const handleOutsideClick = (event) => {
            if (isChatOpen.value && chatWindowRef.value) {
                // 检查点击是否发生在聊天窗口外部
                // 同时要确保不是点击的触发聊天的按钮
                const isTriggerButton = event.target.closest(".chat-trigger");
                const isInsideChatWindow = chatWindowRef.value.contains(
                    event.target,
                );

                if (!isInsideChatWindow && !isTriggerButton) {
                    isChatOpen.value = false;
                    emit("toggle", false);
                }
            }
        };

        // 监听初始打开状态变化
        watch(
            () => props.initialOpen,
            (newVal) => {
                isChatOpen.value = newVal;
                if (newVal) {
                    focusInput();
                }
            },
        );

        // 在聊天开关时滚动到底部并聚焦输入框
        watch(isChatOpen, (isOpen) => {
            if (isOpen) {
                nextTick(() => {
                    scrollToBottom();
                    focusInput();
                });
            }
        });

        // 聊天历史变化时滚动到底部
        watch(
            chatHistory,
            () => {
                nextTick(scrollToBottom);
            },
            { deep: true },
        );
        // 清除聊天历史记录
        const clearHistory = async () => {
            // 显示确认对话框
            if (!confirm("确定要清除所有聊天记录吗？")) {
                return;
            }

            try {
                // 调用后端API清除历史
                const clearUrl = props.apiUrl.replace(/\/chat$/, "/chat/clear");
                const response = await fetch(clearUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": window.location.origin,
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        userId: sessionId.value,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();

                    // 更新会话ID
                    if (data.newSessionId) {
                        saveSessionId(data.newSessionId);
                    }
                    // 清除本地聊天历史
                    chatHistory.value = [];
                    // 显示系统消息，表明历史已清除
                    systemMessageTime.value = new Date().toISOString();
                }
            } catch (error) {
                console.error("清除聊天历史失败:", error);
                alert("清除聊天历史失败，请稍后再试");
            }
        };

        // 切换聊天窗口
        const toggleChat = () => {
            isChatOpen.value = !isChatOpen.value;
            emit("toggle", isChatOpen.value);
        };

        // 打开聊天窗口（由外部调用）
        const openChat = () => {
            isChatOpen.value = true;
            emit("toggle", true);
        };

        // 滚动到聊天底部
        const scrollToBottom = () => {
            if (chatMessagesRef.value) {
                chatMessagesRef.value.scrollTop =
                    chatMessagesRef.value.scrollHeight;
            }
        };

        // 聚焦输入框
        const focusInput = () => {
            nextTick(() => {
                if (inputRef.value) {
                    inputRef.value.focus();
                }
            });
        };

        // 处理回车键
        const handleEnter = (e) => {
            if (e.shiftKey) return; // 允许Shift+Enter换行
            sendMessage();
        };

        // 格式化消息（将Markdown转换为HTML）
        const formatMessage = (content) => {
            return marked(content);
        };

        // 格式化时间显示（人性化的中文时间格式）
        const formatTime = (timestamp) => {
            if (!timestamp) return "";

            const now = new Date();
            const messageTime = new Date(timestamp);

            // 计算时间差（毫秒）
            const diff = now - messageTime;

            // 刚刚发送的消息（1分钟内）
            if (diff < 60000) {
                return "刚刚";
            }

            // 几分钟前（1小时内）
            if (diff < 3600000) {
                const minutes = Math.floor(diff / 60000);
                return `${minutes}分钟前`;
            }

            // 格式化小时和分钟
            const hours = messageTime.getHours().toString().padStart(2, "0");
            const minutes = messageTime
                .getMinutes()
                .toString()
                .padStart(2, "0");
            const timeString = `${hours}:${minutes}`;

            // 今天的消息
            if (messageTime.toDateString() === now.toDateString()) {
                return `今天 ${timeString}`;
            }

            // 计算昨天的日期
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);

            // 昨天的消息
            if (messageTime.toDateString() === yesterday.toDateString()) {
                return `昨天 ${timeString}`;
            }

            // 更早的消息，显示完整日期
            const year = messageTime.getFullYear();
            const month = (messageTime.getMonth() + 1)
                .toString()
                .padStart(2, "0");
            const day = messageTime.getDate().toString().padStart(2, "0");

            return `${year}年${month}月${day}日 ${timeString}`;
        };

        // 发送消息到后端
        const sendMessage = async () => {
            const message = userInput.value.trim();
            if (!message || isLoading.value) return;

            // 获取当前时间戳
            const currentTimestamp = new Date().toISOString();

            // 添加用户消息到聊天历史（带上时间戳）
            chatHistory.value.push({
                role: "user",
                content: message,
                timestamp: currentTimestamp,
            });

            // 清空输入框
            userInput.value = "";

            // 显示加载状态
            isLoading.value = true;

            try {
                // 调用后端API（发送完整历史记录，包含时间戳）
                const response = await fetch(props.apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": window.location.origin,
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        message,
                        history: chatHistory.value.slice(0, -1),
                        timestamp: currentTimestamp,
                        userId: sessionId.value,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`API请求失败: ${response.status}`);
                }

                const data = await response.json();

                // 获取回复的时间戳
                const replyTimestamp = new Date().toISOString();

                // 添加AI回复到聊天历史（带上时间戳）
                chatHistory.value.push({
                    role: "assistant",
                    content: data.reply || "抱歉，我现在无法回应。请稍后再试。",
                    timestamp: replyTimestamp,
                });
            } catch (error) {
                console.error("聊天请求失败:", error);

                // 添加错误消息（带上时间戳）
                chatHistory.value.push({
                    role: "assistant",
                    content: "抱歉，连接出现问题。请检查网络连接或稍后再试。",
                    timestamp: new Date().toISOString(),
                });
            } finally {
                // 隐藏加载状态
                isLoading.value = false;
            }
        };

        // 生命周期钩子
        onMounted(() => {
            // 为现有的聊天消息添加时间戳（如果没有的话）
            setTimeout(() => {
                document.addEventListener("click", handleOutsideClick);
            }, 100);

            // 添加自定义事件监听
            document.addEventListener("openNahidaChat", handleOpenChatEvent);

            chatHistory.value.forEach((message) => {
                if (!message.timestamp) {
                    message.timestamp = new Date().toISOString();
                }
            });
        });

        return {
            isChatOpen,
            userInput,
            isLoading,
            chatHistory,
            chatMessagesRef,
            inputRef,
            chatWindowRef,
            systemMessageTime,
            toggleChat,
            openChat,
            sendMessage,
            handleEnter,
            formatMessage,
            formatTime,
            clearHistory,
            sessionId,
            handleDoubleClick,
        };
    },
};
</script>
<style scoped>
.nahida-chat-container {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1001; /* 确保在看板娘上面 */
    pointer-events: none; /* 默认不阻挡其他元素 */
}

.chat-trigger {
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    background-color: var(--vp-c-brand, #68b587);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
        transform 0.3s,
        box-shadow 0.3s;
    z-index: 999;
    pointer-events: auto; /* 按钮可以点击 */
}

@media (max-width: 768px) {
    .chat-trigger {
        right: 15px; /* 保持在右侧 */
        bottom: 70px; /* 提高位置，避免与Live2D重叠 */
    }
}

.chat-trigger:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.chat-icon {
    width: 30px;
    height: 30px;
    color: white;
}

.chat-window {
    position: fixed;
    right: 15px;
    bottom: 15px;
    width: 500px;
    height: 700px;
    background-color: var(--vp-c-bg, white);
    border-radius: 10px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slide-up 0.3s ease;
    color: var(--vp-c-text-1, #213547);
    border: 1px solid var(--vp-c-divider, #e2e2e2);
    pointer-events: auto; /* 聊天窗口可以接收事件 */
    user-select: none; /* 禁用文本选择，防止意外的双击选择 */
}

@media (max-width: 768px) {
    .chat-window {
        width: 90%; /* 默认占用90%的屏幕宽度 */
        max-width: 480px; /* 但不超过480px */
        height: 70vh; /* 高度设为视口高度的70% */
        right: 5%; /* 水平居中 */
        left: 5%;
        bottom: 10vh; /* 离底部有一定距离，避免与Live2D重叠 */
    }
}

@media (max-width: 480px) {
    .chat-window {
        width: 90%;
        height: 60vh;
    }
}

.chat-header {
    padding: 15px;
    background-color: var(--vp-c-brand, #68b587);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-title {
    font-weight: bold;
}

.chat-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.clear-history-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: all 0.3s;
}

.clear-history-btn:hover {
    opacity: 1;
    transform: scale(1.1);
}

.clear-icon {
    width: 20px;
    height: 20px;
}

.chat-close {
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
}

.chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    user-select: text; /* 在消息区域允许文本选择 */
}

.message {
    display: flex;
    margin-bottom: 10px;
}

.message.user {
    justify-content: flex-end;
}

.message.ai {
    justify-content: flex-start;
}

.message.system {
    justify-content: center;
}

.message .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    flex-shrink: 0;
}

.message .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 纳西妲头像样式 */
.message .avatar.nahida-avatar {
    background-color: var(--vp-c-brand, #68b587);
    color: white;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.message-content {
    padding: 10px 15px;
    border-radius: 18px;
    max-width: 70%;
    word-break: break-word;
    position: relative;
}

/* 用户消息样式 */
.message.user .message-content {
    background-color: var(--vp-c-brand, #68b587);
    color: white;
}

/* 新增：消息时间样式 */
.message-time {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 4px;
    text-align: right;
    color: var(--vp-c-text-2, #666);
}

.message.system .message-time {
    text-align: center;
}

.message.user .message-time {
    color: rgba(255, 255, 255, 0.8);
}

html.dark .message.user .message-content {
    background-color: var(--vp-c-brand-dark, #346648);
    color: var(--vp-c-text-inverse-1, #fff);
}

html.dark .message.ai .message-content {
    background-color: var(--vp-c-bg-alt, #242424);
    color: var(--vp-c-text-1, #ddd);
}
.message.ai .message-content {
    background-color: var(--vp-c-bg-soft, #f1f0f0);
    color: var(--vp-c-text-1, #213547);
}

.message.system .message-content {
    background-color: var(--vp-c-bg-soft, rgba(104, 181, 135, 0.2));
    color: var(--vp-c-brand-dark, #68b587);
    font-style: italic;
    max-width: 100%;
    text-align: center;
    font-size: 0.9em;
}
/* 使AI消息内容中的图像响应式 */
.message.ai .message-content :deep(img) {
    max-width: 100%;
    height: auto;
}

/* 使AI消息内容中的链接有样式 */
.message.ai .message-content :deep(a) {
    color: var(--vp-c-brand, #68b587);
    text-decoration: underline;
}

/* 确保代码块样式正确 */
.message.ai .message-content :deep(pre) {
    background-color: var(--vp-c-bg-soft, #f6f8fa);
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: monospace;
}

.chat-input-container {
    padding: 15px;
    border-top: 1px solid var(--vp-c-divider, #eee);
    display: flex;
    background-color: var(--vp-c-bg, white);
}

.chat-input {
    flex: 1;
    height: 40px;
    max-height: 120px;
    border: 1px solid var(--vp-c-divider, #ddd);
    border-radius: 20px;
    padding: 10px 15px;
    resize: none;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    transition: border-color 0.3s;
    line-height: 20px;
    background-color: var(--vp-c-bg, white);
    color: var(--vp-c-text-1, #213547);
    user-select: text; /* 输入框允许文本选择 */
}

.chat-input:focus {
    border-color: var(--vp-c-brand, #68b587);
}

.send-button {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    border: none;
    background-color: var(--vp-c-brand, #68b587);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
}

.send-button:hover {
    background-color: var(--vp-c-brand-dark, #56a873);
}

.send-button:disabled {
    background-color: var(--vp-c-gray, #ccc);
    cursor: not-allowed;
}

.send-icon {
    width: 20px;
    height: 20px;
    color: white;
}
/* 打字指示器动画 */
.typing-indicator {
    display: flex;
    padding: 5px;
}

.typing-indicator span {
    height: 8px;
    width: 8px;
    background-color: var(--vp-c-brand, #68b587);
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    opacity: 0.6;
}

.typing-indicator span:nth-child(1) {
    animation: bounce 1.2s infinite 0.2s;
}
.typing-indicator span:nth-child(2) {
    animation: bounce 1.2s infinite 0.4s;
}
.typing-indicator span:nth-child(3) {
    animation: bounce 1.2s infinite 0.6s;
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

@keyframes slide-up {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* 为避免与VitePress主题冲突的样式重置 */
.nahida-chat-container button,
.nahida-chat-container input,
.nahida-chat-container textarea {
    font-family: inherit;
}
</style>
