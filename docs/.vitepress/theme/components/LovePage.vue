<template>
    <div class="love-page">
        <!-- 主页视图 - 爱心页面 -->
        <div v-if="currentView === 'home'" class="love-home">
            <div class="love-heart-container">
                <!-- 左侧头像 -->
                <div class="avatar-left">
                    <img
                        :src="getPublicAvatar(2)"
                        :alt="getPublicName(2)"
                        class="couple-avatar"
                    />
                    <span class="avatar-name">{{ getPublicName(WebGL2RenderingContext) }}</span>
                </div>

                <!-- 中央大爱心 -->
                <div class="love-heart-main" @click="goToAuth">
                    <div class="heart-background">
                        <svg viewBox="0 0 24 24" class="heart-icon-large">
                            <path
                                fill="currentColor"
                                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                            />
                        </svg>
                    </div>
                    <div class="heart-content">
                        <h1 class="love-title">关于我们</h1>
                        <div v-if="publicLoveStats" class="love-time-display">
                            <span class="love-days">{{ publicLoveStats.days }}</span>
                            <span class="love-days-text">天</span>
                            <div class="love-time-details">
                                {{ publicLoveStats.hours }}小时 {{ publicLoveStats.minutes }}分钟
                            </div>
                        </div>
                        <p class="love-subtitle"></p>
                    </div>
                </div>

                <!-- 右侧头像 -->
                <div class="avatar-right">
                    <img
                        :src="getPublicAvatar(1)"
                        :alt="getPublicName(1)"
                        class="couple-avatar"
                    />
                    <span class="avatar-name">{{ getPublicName(1) }}</span>
                </div>
            </div>
        </div>

        <!-- 认证视图 - 密码输入 -->
        <div v-if="currentView === 'auth'" class="love-auth">
            <div class="auth-container">
                <div class="auth-header">
                    <button class="back-btn" @click="goBack">← 返回</button>
                    <h2>验证身份</h2>
                </div>

                <div class="auth-form">
                    <div class="password-group">
                        <label for="password">请输入访问密码</label>
                        <input
                            id="password"
                            type="password"
                            v-model="password"
                            @keyup.enter="login"
                            placeholder="输入密码..."
                            :disabled="isLoading"
                        />
                    </div>

                    <button
                        class="login-btn"
                        @click="login"
                        :disabled="isLoading || !password.trim()"
                    >
                        <span v-if="isLoading">验证中...</span>
                        <span v-else">进入</span>
                    </button>

                    <div v-if="authError" class="error-message">
                        {{ authError }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 博客空间视图 -->
        <div v-if="currentView === 'blog'" class="love-blog">
            <div class="blog-header">
                <div class="blog-nav">
                    <h1>{{ userType === "couple" ? "我们的" : "" }}爱情时光</h1>
                    <div class="nav-actions">
                        <span v-if="loveStats" class="love-time">
                            相爱 {{ loveStats.days }} 天
                            {{ loveStats.hours }} 小时
                            {{ loveStats.minutes }} 分钟
                        </span>
                        <button
                            v-if="userType === 'couple'"
                            class="new-post-btn"
                            @click="showNewPostModal = true"
                        >
                            + 新建帖子
                        </button>
                        <button class="logout-btn" @click="logout">退出</button>
                    </div>
                </div>
            </div>

            <div class="blog-content">
                <!-- 时间线 -->
                <div class="timeline">
                    <div
                        v-for="(post, index) in posts"
                        :key="post.id"
                        :class="[
                            'timeline-item',
                            getTimelineClass(post, index),
                        ]"
                    >
                        <div class="timeline-content">
                            <div class="post-header">
                                <div class="author-info">
                                    <img
                                        :src="getAuthorAvatar(post.author_id)"
                                        :alt="getAuthorName(post.author_id)"
                                        class="author-avatar"
                                    />
                                    <div class="author-details">
                                        <span class="author-name">{{
                                            getAuthorName(post.author_id)
                                        }}</span>
                                        <span class="post-date">{{
                                            formatDate(post.created_at)
                                        }}</span>
                                    </div>
                                </div>
                                <div
                                    v-if="userType === 'couple'"
                                    class="post-actions"
                                >
                                    <button
                                        @click="editPost(post)"
                                        class="edit-btn"
                                    >
                                        编辑
                                    </button>
                                    <button
                                        @click="deletePost(post.id)"
                                        class="delete-btn"
                                    >
                                        删除
                                    </button>
                                </div>
                            </div>

                            <h3 class="post-title">{{ post.title }}</h3>
                            <div
                                class="post-content"
                                v-html="formatContent(post.content)"
                            ></div>

                            <div v-if="post.images" class="post-images">
                                <img
                                    v-for="image in JSON.parse(post.images)"
                                    :key="image"
                                    :src="image"
                                    alt="帖子图片"
                                    class="post-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-if="posts.length === 0" class="empty-state">
                    <div class="empty-icon">💝</div>
                    <p>还没有记录我们的故事呢</p>
                    <p v-if="userType === 'couple'">
                        快来写下第一个美好回忆吧！
                    </p>
                </div>
            </div>
        </div>

        <!-- 新建/编辑帖子弹窗 -->
        <div v-if="showNewPostModal" class="modal-overlay" @click="closeModal">
            <div class="modal" @click.stop>
                <div class="modal-header">
                    <h3>{{ editingPost ? "编辑帖子" : "新建帖子" }}</h3>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                        <label for="post-title">标题</label>
                        <input
                            id="post-title"
                            type="text"
                            v-model="newPost.title"
                            placeholder="给这个回忆起个标题..."
                        />
                    </div>

                    <div class="form-group">
                        <label for="post-author">作者</label>
                        <select id="post-author" v-model="newPost.author_id">
                            <option
                                v-for="user in users"
                                :key="user.id"
                                :value="user.id"
                            >
                                {{ user.username }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="post-content">内容</label>
                        <textarea
                            id="post-content"
                            v-model="newPost.content"
                            placeholder="记录下这个美好的时刻..."
                            rows="6"
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label for="post-visibility">可见性</label>
                        <select
                            id="post-visibility"
                            v-model="newPost.visibility"
                        >
                            <option value="public">
                                公开 - 访客也可以看到
                            </option>
                            <option value="private">
                                私密 - 只有我们可以看到
                            </option>
                        </select>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="cancel-btn" @click="closeModal">取消</button>
                    <button
                        class="save-btn"
                        @click="savePost"
                        :disabled="
                            !newPost.title.trim() || !newPost.content.trim()
                        "
                    >
                        {{ editingPost ? "更新" : "发布" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

// 响应式数据
const currentView = ref("home"); // home, auth, blog
const password = ref("");
const isLoading = ref(false);
const authError = ref("");
const userType = ref(""); // couple, visitor
const posts = ref([]);
const users = ref([]);
const settings = ref({});
const loveStats = ref(null);
const publicLoveStats = ref(null);
const publicSettings = ref({});
const showNewPostModal = ref(false);
const editingPost = ref(null);

// 新帖子表单
const newPost = reactive({
    title: "",
    content: "",
    author_id: "",
    visibility: "public",
});

// API基础URL
const API_BASE = "https://api.oooo.blog/api";

// 计算相爱时长的定时器
let loveTimer = null;
let publicLoveTimer = null;

// 方法
const goToAuth = () => {
    currentView.value = "auth";
    authError.value = "";
};

const goBack = () => {
    currentView.value = "home";
    password.value = "";
    authError.value = "";
};

const login = async () => {
    if (!password.value.trim()) return;

    isLoading.value = true;
    authError.value = "";

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ password: password.value }),
        });

        const data = await response.json();

        if (data.success) {
            userType.value = data.user.type;
            currentView.value = "blog";
            await loadBlogData();
            startLoveTimer();
        } else {
            authError.value = data.message || "密码错误";
        }
    } catch (error) {
        console.error("登录错误:", error);
        authError.value = "网络错误，请稍后重试";
    } finally {
        isLoading.value = false;
    }
};

const logout = async () => {
    try {
        await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("退出登录错误:", error);
    }

    // 清理状态
    userType.value = "";
    posts.value = [];
    users.value = [];
    settings.value = {};
    loveStats.value = null;
    password.value = "";
    currentView.value = "home";
    stopLoveTimer();
};

const loadBlogData = async () => {
    try {
        // 并行加载数据
        const [postsRes, settingsRes] = await Promise.all([
            fetch(`${API_BASE}/posts`, { credentials: "include" }),
            fetch(`${API_BASE}/settings`, { credentials: "include" }),
        ]);

        const [postsData, settingsData] = await Promise.all([
            postsRes.json(),
            settingsRes.json(),
        ]);

        if (postsData.success) {
            posts.value = postsData.posts;
        }

        if (settingsData.success) {
            settings.value = settingsData.settings;
            // 构建用户信息
            users.value = [
                {
                    id: 1,
                    username: settings.value.couple_name_1 || "用户1",
                    avatar_qq: settings.value.couple_avatar_1,
                },
                {
                    id: 2,
                    username: settings.value.couple_name_2 || "用户2",
                    avatar_qq: settings.value.couple_avatar_2,
                },
            ];

            // 设置默认作者
            if (!newPost.author_id && users.value.length > 0) {
                newPost.author_id = users.value[0].id;
            }
        }

        calculateLoveStats();
    } catch (error) {
        console.error("加载数据错误:", error);
    }
};

// 加载公开设置（不需要登录）
const loadPublicSettings = async () => {
    try {
        const response = await fetch(`${API_BASE}/public/settings`);
        const data = await response.json();

        if (data.success) {
            publicSettings.value = data.settings;
            calculatePublicLoveStats();
            startPublicLoveTimer();
        }
    } catch (error) {
        console.error("加载公开设置错误:", error);
        // 设置默认值
        publicSettings.value = {
            couple_name_1: "CYH",
            couple_name_2: "ZXR",
            couple_avatar_1: "",
            couple_avatar_2: "",
            love_start_date: "2025-06-12"
        };
        calculatePublicLoveStats();
        startPublicLoveTimer();
    }
};

const calculateLoveStats = () => {
    const startDate = settings.value.love_start_date;
    if (!startDate) return;

    const start = new Date(startDate);
    const now = new Date();
    const diffMs = now - start;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    loveStats.value = { days, hours, minutes };
};

const calculatePublicLoveStats = () => {
    const startDate = publicSettings.value.love_start_date;
    if (!startDate) return;

    const start = new Date(startDate);
    const now = new Date();
    const diffMs = now - start;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    publicLoveStats.value = { days, hours, minutes };
};

const startLoveTimer = () => {
    calculateLoveStats();
    loveTimer = setInterval(calculateLoveStats, 60000); // 每分钟更新
};

const startPublicLoveTimer = () => {
    calculatePublicLoveStats();
    publicLoveTimer = setInterval(calculatePublicLoveStats, 60000); // 每分钟更新
};

const stopLoveTimer = () => {
    if (loveTimer) {
        clearInterval(loveTimer);
        loveTimer = null;
    }
};

const stopPublicLoveTimer = () => {
    if (publicLoveTimer) {
        clearInterval(publicLoveTimer);
        publicLoveTimer = null;
    }
};

const getPublicAvatar = (authorId) => {
    const avatarQQ = authorId === 1 ?
        publicSettings.value.couple_avatar_1 :
        publicSettings.value.couple_avatar_2;

    if (avatarQQ) {
        return `https://q1.qlogo.cn/g?b=qq&nk=${avatarQQ}&s=200`;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`;
};

const getPublicName = (authorId) => {
    return authorId === 1 ?
        (publicSettings.value.couple_name_1 || "Ta") :
        (publicSettings.value.couple_name_2 || "Ta");
};

const getTimelineClass = (post, index) => {
    const authorId = post.author_id;
    return authorId === 1 ? "timeline-left" : "timeline-right";
};

const getAuthorAvatar = (authorId) => {
    const user = users.value.find((u) => u.id === authorId);
    if (user && user.avatar_qq) {
        return `https://q1.qlogo.cn/g?b=qq&nk=${user.avatar_qq}&s=100`;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`;
};

const getAuthorName = (authorId) => {
    const user = users.value.find((u) => u.id === authorId);
    return user ? user.username : "未知用户";
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatContent = (content) => {
    return content.replace(/\n/g, "<br>");
};

const editPost = (post) => {
    editingPost.value = post;
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.author_id = post.author_id;
    newPost.visibility = post.visibility;
    showNewPostModal.value = true;
};

const deletePost = async (postId) => {
    if (!confirm("确定要删除这个帖子吗？")) return;

    try {
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
            posts.value = posts.value.filter((p) => p.id !== postId);
        } else {
            alert("删除失败：" + data.message);
        }
    } catch (error) {
        console.error("删除帖子错误:", error);
        alert("删除失败，请稍后重试");
    }
};

const closeModal = () => {
    showNewPostModal.value = false;
    editingPost.value = null;
    newPost.title = "";
    newPost.content = "";
    newPost.visibility = "public";
    if (users.value.length > 0) {
        newPost.author_id = users.value[0].id;
    }
};

const savePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
        const url = editingPost.value
            ? `${API_BASE}/posts/${editingPost.value.id}`
            : `${API_BASE}/posts`;

        const method = editingPost.value ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newPost),
        });

        const data = await response.json();

        if (data.success) {
            if (editingPost.value) {
                // 更新现有帖子
                const index = posts.value.findIndex(
                    (p) => p.id === editingPost.value.id,
                );
                if (index !== -1) {
                    posts.value[index] = { ...posts.value[index], ...newPost };
                }
            } else {
                // 添加新帖子
                posts.value.unshift({
                    ...data.post,
                    created_at: new Date().toISOString(),
                });
            }
            closeModal();
        } else {
            alert("保存失败：" + data.message);
        }
    } catch (error) {
        console.error("保存帖子错误:", error);
        alert("保存失败，请稍后重试");
    }
};

// 生命周期
onMounted(() => {
    // 加载公开设置
    loadPublicSettings();
    // 检查是否已经登录
    checkAuthStatus();
});

onUnmounted(() => {
    stopLoveTimer();
    stopPublicLoveTimer();
});

const checkAuthStatus = async () => {
    try {
        const response = await fetch(`${API_BASE}/auth/status`, {
            credentials: "include",
        });

        const data = await response.json();
        if (data.success && data.user) {
            userType.value = data.user.type;
            currentView.value = "blog";
            await loadBlogData();
            startLoveTimer();
        }
    } catch (error) {
        console.error("检查登录状态错误:", error);
    }
};
</script>

<style scoped>
.love-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 0;
    margin: 0;
}

/* 主页样式 */
.love-home {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    color: white;
}

.love-heart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    width: 100%;
    max-width: 1200px;
    animation: fadeInUp 1s ease-out;
}

/* 头像样式 */
.avatar-left,
.avatar-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    animation: slideInLeft 1s ease-out;
}

.avatar-right {
    animation: slideInRight 1s ease-out;
}

.couple-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
    object-fit: cover;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.couple-avatar:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.6);
}

.avatar-name {
    font-size: 1.2rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 中央爱心样式 */
.love-heart-main {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 400px;
    min-height: 400px;
    transition: all 0.3s ease;
}

.love-heart-main:hover {
    transform: scale(1.05);
}

.heart-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.heart-icon-large {
    width: 1000px;
    height: 1000px;
    color: #ff6b9d;
    filter: drop-shadow(0 10px 20px rgba(255, 107, 157, 0.3));
    animation: heartbeat 2s infinite;
}

.heart-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
}

.love-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 300;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.love-time-display {
    margin-bottom: 1.5rem;
}

.love-days {
    font-size: 3rem;
    font-weight: 700;
    display: inline-block;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.love-days-text {
    font-size: 1.5rem;
    margin-left: 0.5rem;
    opacity: 0.9;
}

.love-time-details {
    font-size: 1.1rem;
    opacity: 0.8;
    margin-top: 0.5rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.love-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* 认证页面样式 */
.love-auth {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
}

.auth-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    animation: slideInUp 0.5s ease-out;
}

.auth-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}

.back-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: #667eea;
    cursor: pointer;
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background 0.2s ease;
}

.back-btn:hover {
    background: rgba(102, 126, 234, 0.1);
}

.auth-header h2 {
    color: #333;
    margin: 0;
}

.auth-form {
    text-align: left;
}

.password-group {
    margin-bottom: 2rem;
}

.password-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
}

.password-group input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
}

.password-group input:focus {
    outline: none;
    border-color: #667eea;
}

.login-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
}

.login-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    color: #e74c3c;
    margin-top: 1rem;
    padding: 0.8rem;
    background: rgba(231, 76, 60, 0.1);
    border-radius: 8px;
    text-align: center;
}

/* 博客页面样式 */
.love-blog {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    color: #333;
}

.blog-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1.5rem 2rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.blog-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.blog-nav h1 {
    color: #333;
    margin: 0;
    font-weight: 300;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.love-time {
    color: #667eea;
    font-weight: 500;
    padding: 0.5rem 1rem;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 20px;
    font-size: 0.9rem;
}

.new-post-btn,
.logout-btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
}

.new-post-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.logout-btn {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
}

.new-post-btn:hover,
.logout-btn:hover {
    transform: translateY(-2px);
}

.blog-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

/* 时间线样式 */
.timeline {
    position: relative;
    padding: 2rem 0;
}

.timeline::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #667eea, #764ba2);
    transform: translateX(-50%);
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    display: flex;
    align-items: flex-start;
}

.timeline-left {
    justify-content: flex-end;
    padding-right: calc(50% + 2rem);
}

.timeline-right {
    justify-content: flex-start;
    padding-left: calc(50% + 2rem);
}

.timeline-content {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    position: relative;
    animation: slideInUp 0.5s ease-out;
}

.timeline-left .timeline-content::after {
    content: "";
    position: absolute;
    top: 20px;
    right: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: white;
}

.timeline-right .timeline-content::after {
    content: "";
    position: absolute;
    top: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: white;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.author-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.author-details {
    display: flex;
    flex-direction: column;
}

.author-name {
    font-weight: 600;
    color: #333;
}

.post-date {
    font-size: 0.85rem;
    color: #888;
}

.post-actions {
    display: flex;
    gap: 0.5rem;
}

.edit-btn,
.delete-btn {
    padding: 0.3rem 0.8rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s ease;
}

.edit-btn {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
}

.delete-btn {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
}

.edit-btn:hover,
.delete-btn:hover {
    transform: translateY(-1px);
}

.post-title {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
}

.post-content {
    line-height: 1.6;
    color: #555;
    margin-bottom: 1rem;
}

.post-images {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.post-image {
    max-width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

/* 空状态 */
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #888;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
}

.modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.2s ease;
}

.modal-close:hover {
    background: rgba(0, 0, 0, 0.1);
}

.modal-body {
    padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid #eee;
}

.cancel-btn,
.save-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
}

.cancel-btn {
    background: #f8f9fa;
    color: #6c757d;
}

.save-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.cancel-btn:hover,
.save-btn:hover {
    transform: translateY(-1px);
}

.save-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .love-heart-container {
        flex-direction: column;
        gap: 2rem;
    }

    .love-heart-main {
        min-width: 300px;
        min-height: 300px;
        order: -1;
    }

    .heart-icon-large {
        width: 200px;
        height: 200px;
    }

    .love-title {
        font-size: 2rem;
    }

    .love-days {
        font-size: 2.5rem;
    }

    .couple-avatar {
        width: 100px;
        height: 100px;
    }
}

@media (max-width: 768px) {
    .love-heart-container {
        gap: 1.5rem;
        padding: 1rem;
    }

    .love-heart-main {
        min-width: 250px;
        min-height: 250px;
    }

    .heart-icon-large {
        width: 150px;
        height: 150px;
    }

    .love-title {
        font-size: 1.5rem;
    }

    .love-days {
        font-size: 2rem;
    }

    .couple-avatar {
        width: 80px;
        height: 80px;
    }

    .avatar-name {
        font-size: 1rem;
    }

    .blog-nav {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .nav-actions {
        flex-wrap: wrap;
        justify-content: center;
    }

    .timeline::before {
        left: 2rem;
    }

    .timeline-left,
    .timeline-right {
        justify-content: flex-start;
        padding-left: 4rem;
        padding-right: 1rem;
    }

    .timeline-content {
        max-width: none;
    }

    .timeline-left .timeline-content::after,
    .timeline-right .timeline-content::after {
        left: -10px;
        border-right-color: white;
        border-left-color: transparent;
    }

    .modal {
        margin: 1rem;
    }

    .modal-body {
        padding: 1rem;
    }
}

/* 动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes heartbeat {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}
/* Love Page 样式完全覆盖文件 */

/* 全局重置 */
html,
body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100% !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
}

* {
    box-sizing: border-box !important;
}

/* 隐藏所有 VitePress 默认组件 */
.Layout,
.VPApp > :not(.love-page),
.VPNav,
.VPNavBar,
.VPNavBarContainer,
.VPSidebar,
.VPSidebarNav,
.VPLocalNav,
.VPContent,
.VPDoc,
.VPDocOutline,
.VPDocFooter,
.VPFooter,
.container,
.content,
.content-container,
.main {
    display: none !important;
    visibility: hidden !important;
}

/* 确保 VitePress 应用容器不干扰 */
#app {
    height: 100vh !important;
    width: 100vw !important;
    overflow: hidden !important;
    position: relative !important;
}

.VPApp {
    height: 100vh !important;
    width: 100vw !important;
    overflow: hidden !important;
}

/* Love Page 专用样式 */
.love-page {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    overflow: hidden !important;
}

/* 确保没有滚动条 */
::-webkit-scrollbar {
    display: none !important;
}

body {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}

/* 移除所有可能的边框和外边距 */
.love-page * {
    border: none !important;
    outline: none !important;
}

/* 响应式处理 */
@media (max-width: 768px) {
    .love-page {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
    }
}

</style>
