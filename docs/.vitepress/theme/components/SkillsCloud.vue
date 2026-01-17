<template>
    <div class="skills-cloud">
        <div class="cloud-card">
            <p class="cloud-caption">从博客内容提炼的主题词</p>
            <div v-if="items.length" class="cloud">
                <component
                    v-for="(item, index) in items"
                    :is="item.href ? 'a' : 'span'"
                    :key="item.text"
                    class="cloud-tag"
                    :style="tagStyle(item, index)"
                    v-bind="item.href ? { href: item.href } : {}"
                >
                    {{ item.text }}
                </component>
            </div>
            <p v-else class="cloud-empty">还没有可展示的词条，请先生成词云数据。</p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const items = ref([]);

onMounted(async () => {
    try {
        const response = await fetch("/skills-cloud.json", {
            cache: "no-cache",
        });
        if (!response.ok) {
            throw new Error(`Failed to load skills cloud: ${response.status}`);
        }
        items.value = await response.json();
    } catch (error) {
        console.warn(error);
        items.value = [];
    }
});

const stats = computed(() => {
    if (!items.value.length) {
        return { min: 0, max: 0 };
    }
    const counts = items.value.map((item) => item.count || 1);
    return {
        min: Math.min(...counts),
        max: Math.max(...counts),
    };
});

function hashText(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
        hash = (hash * 31 + text.charCodeAt(i)) % 1000003;
    }
    return hash;
}

function sizeWeight(count) {
    if (stats.value.max === stats.value.min) {
        return 3.5;
    }
    const ratio =
        (count - stats.value.min) / (stats.value.max - stats.value.min);
    return 2.2 + ratio * 3.8;
}

function tagStyle(item, index) {
    const base = hashText(item.text);
    const hue = 18 + (base % 210);
    const rotate = (base % 7) - 3;
    return {
        "--w": sizeWeight(item.count || 1),
        "--h": hue,
        "--r": `${rotate}deg`,
        "--i": index,
    };
}
</script>

<style scoped>
.skills-cloud {
    --cloud-ink: #243133;
    --cloud-edge: rgba(36, 49, 51, 0.12);
    --cloud-shadow: rgba(36, 49, 51, 0.16);
    --cloud-glow: rgba(244, 162, 97, 0.2);
    max-width: 980px;
    margin: 0 auto;
    font-family: "IBM Plex Sans", "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", sans-serif;
}

.skills-cloud .cloud-card {
    position: relative;
    padding: 22px 22px 26px;
    border-radius: 18px;
    border: 1px solid var(--cloud-edge);
    background: radial-gradient(
            circle at 18% 18%,
            #fff7e6 0%,
            #f4ead7 38%,
            #f7f1e3 70%
        ),
        linear-gradient(140deg, rgba(42, 157, 143, 0.12), rgba(244, 162, 97, 0.18));
    box-shadow: 0 12px 24px var(--cloud-shadow);
    overflow: hidden;
}

.skills-cloud .cloud-card::before,
.skills-cloud .cloud-card::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    background: radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0)
    );
    opacity: 0.7;
    filter: drop-shadow(0 8px 18px var(--cloud-glow));
    z-index: 0;
}

.skills-cloud .cloud-card::before {
    width: 180px;
    height: 90px;
    top: -28px;
    right: 12%;
}

.skills-cloud .cloud-card::after {
    width: 220px;
    height: 110px;
    bottom: -36px;
    left: 8%;
}

.skills-cloud .cloud-caption {
    margin: 0 0 14px;
    font-size: 14px;
    letter-spacing: 1px;
    color: #4b5a5c;
    font-family: "Spectral", "Songti SC", "STSong", serif;
}

.skills-cloud .cloud {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 14px;
    justify-content: center;
    align-items: center;
}

.skills-cloud .cloud-tag {
    --w: 3;
    --h: 28;
    --r: 0deg;
    --i: 0;
    display: inline-block;
    padding: 6px 12px;
    border-radius: 999px;
    font-weight: 600;
    line-height: 1.1;
    font-size: calc(12px + (var(--w) * 5px));
    color: hsl(var(--h) 36% 24%);
    background: hsl(var(--h) 70% 93%);
    border: 1px solid hsl(var(--h) 45% 80% / 0.8);
    box-shadow: 0 6px 14px rgba(32, 40, 42, 0.12);
    text-decoration: none;
    transform: rotate(var(--r));
    animation: cloud-pop 0.7s ease both;
    animation-delay: calc(var(--i) * 60ms);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skills-cloud .cloud-tag:hover {
    transform: translateY(-2px) rotate(var(--r));
    box-shadow: 0 10px 18px rgba(32, 40, 42, 0.18);
}

.skills-cloud .cloud-empty {
    position: relative;
    z-index: 1;
    margin: 0;
    font-size: 14px;
    color: #657072;
    text-align: center;
}

@keyframes cloud-pop {
    0% {
        opacity: 0;
        transform: translateY(10px) rotate(var(--r)) scale(0.96);
    }
    100% {
        opacity: 1;
        transform: translateY(0) rotate(var(--r)) scale(1);
    }
}

@media (max-width: 640px) {
    .skills-cloud .cloud-card {
        padding: 18px 16px 22px;
    }

    .skills-cloud .cloud-tag {
        font-size: calc(11px + (var(--w) * 4px));
        padding: 6px 10px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .skills-cloud .cloud-tag {
        animation: none;
        transition: none;
    }
}
</style>
