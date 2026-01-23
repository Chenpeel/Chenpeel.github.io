<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { withBase } from "vitepress";

const frameCount = 60;
const fps = 24;
const basePath = "/images/math/svd/frames/svd-3d-frame-";
const pad = (value) => String(value).padStart(3, "0");

const canvasRef = ref(null);
const frameIndex = ref(0);
const scrubbing = ref(false);

const images = new Array(frameCount);
let ctx = null;
let rafId = 0;
let lastTime = 0;
let hasCanvasSize = false;

const ensureCanvasSize = (img) => {
  const canvas = canvasRef.value;
  if (!canvas || !img || img.naturalWidth === 0 || img.naturalHeight === 0) {
    return false;
  }
  if (!hasCanvasSize) {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    hasCanvasSize = true;
  }
  return true;
};

const drawFrame = (index) => {
  if (!ctx) {
    return false;
  }
  const img = images[index];
  if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
    return false;
  }
  if (!ensureCanvasSize(img)) {
    return false;
  }
  const canvas = canvasRef.value;
  if (!canvas) {
    return false;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return true;
};

const startAnimation = () => {
  if (rafId) {
    return;
  }
  lastTime = 0;
  rafId = window.requestAnimationFrame(animate);
};

const animate = (time) => {
  if (!lastTime) {
    lastTime = time;
  }
  const frameDuration = 1000 / fps;
  const delta = time - lastTime;
  if (!scrubbing.value && delta >= frameDuration) {
    const step = Math.floor(delta / frameDuration);
    const nextIndex = (frameIndex.value + step) % frameCount;
    if (drawFrame(nextIndex)) {
      frameIndex.value = nextIndex;
    }
    lastTime = time - (delta % frameDuration);
  }
  rafId = window.requestAnimationFrame(animate);
};

const preloadImages = () => {
  for (let i = 0; i < frameCount; i += 1) {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      images[i] = img;
      ensureCanvasSize(img);
      if (i === 0) {
        drawFrame(0);
      }
      startAnimation();
    };
    img.onerror = () => {
      images[i] = null;
    };
    img.src = withBase(`${basePath}${pad(i)}.png`);
  }
};

const onSeekStart = () => {
  scrubbing.value = true;
};

const onSeekEnd = (event) => {
  scrubbing.value = false;
  const value = Number(event.target.value);
  frameIndex.value = value;
  drawFrame(value);
  lastTime = 0;
};

const onSeek = (event) => {
  const value = Number(event.target.value);
  frameIndex.value = value;
  drawFrame(value);
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    ctx = canvas.getContext("2d", { alpha: true });
  }
  preloadImages();
});

onBeforeUnmount(() => {
  if (rafId) {
    window.cancelAnimationFrame(rafId);
  }
});
</script>

<template>
  <div class="svd-player">
    <canvas ref="canvasRef" class="svd-player__canvas" />
    <div class="svd-player__controls">
      <input
        class="svd-player__range"
        type="range"
        min="0"
        :max="frameCount - 1"
        step="1"
        :value="frameIndex"
        aria-label="SVD transform timeline"
        @input="onSeek"
        @pointerdown="onSeekStart"
        @pointerup="onSeekEnd"
        @pointercancel="onSeekEnd"
      />
    </div>
  </div>
</template>

<style scoped>
.svd-player {
  width: min(520px, 100%);
  margin: 12px auto;
  position: relative;
  background: transparent;
}

.svd-player__canvas {
  width: 100%;
  height: auto;
  display: block;
  background: transparent;
}

.svd-player__controls {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  padding: 6px 8px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.svd-player:hover .svd-player__controls,
.svd-player:focus-within .svd-player__controls {
  opacity: 1;
  pointer-events: auto;
}

@media (hover: none) {
  .svd-player__controls {
    opacity: 1;
    pointer-events: auto;
  }
}

.svd-player__range {
  width: 100%;
  accent-color: #00c2ff;
}
</style>
