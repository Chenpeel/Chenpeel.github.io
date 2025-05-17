<template>
    <div v-html="svgRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import mermaid from "mermaid";

const props = defineProps({
    id: String,
    code: String,
});

const render = async (id: string, code: string) => {
    mermaid.initialize({ startOnLoad: false });
    const { svg } = await mermaid.render(id, code);
    return svg;
};

const svgRef = ref("");

onMounted(async () => {
    svgRef.value = await render(props.id, decodeURIComponent(props.code));
});
</script>
