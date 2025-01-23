<template>
    <br /><br /><br /><br /><br /><br />
    <div class="rpcard-container">
        <div class="rpcard-title">最近更新</div>
        <a
            v-for="post in posts"
            :key="post.path"
            :href="post.path"
            class="rpcard"
        >
            <h4>{{ post.title }}</h4>
            <p>{{ post.description }}</p>
            <small>{{ post.date }}</small>
        </a>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);

onMounted(async () => {
    const response = await fetch("/api/recent-posts");
    posts.value = await response.json();
});
</script>

<style scoped>
.rpcard-title {
    font-size: 1.2em;
    font-style: italic;
    font-weight: bolder;
    width: 100%;
    margin-bottom: 16px;
}
.rpcard-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.rpcard {
    text-align: center;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    width: calc(50% - 16px);
    cursor: pointer;
    text-decoration: none;
    color: inherit;
}

.rpcard:hover {
    border: 1px solid #7bc37b;
    transform: translateY(-2px);
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
    .rpcard {
        width: 100%;
    }
}
</style>
