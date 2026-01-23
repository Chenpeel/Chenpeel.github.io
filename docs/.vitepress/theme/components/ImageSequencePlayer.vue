<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { withBase } from "vitepress";

const props = defineProps({
  frameCount: {
    type: Number,
    required: true,
  },
  fps: {
    type: Number,
    default: 24,
  },
  pathPrefix: {
    type: String,
    required: true,
  },
  pathSuffix: {
    type: String,
    default: ".png",
  },
  padLength: {
    type: Number,
    default: 3,
  },
  maxWidth: {
    type: String,
    default: "520px",
  },
  accentColor: {
    type: String,
    default: "#00c2ff",
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  ariaLabel: {
    type: String,
    default: "Image sequence timeline",
  },
});

const pad = (value) => String(value).padStart(Math.max(1, props.padLength), "0");
const maxFrameIndex = computed(() => Math.max(0, props.frameCount - 1));
const rootStyle = computed(() => ({
  "--sequence-player-max-width": props.maxWidth,
  "--sequence-player-accent": props.accentColor,
}));

const canvasRef = ref(null);
const frameIndex = ref(0);
const scrubbing = ref(false);

const images = new Array(props.frameCount);
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
  if (!props.autoPlay || props.frameCount < 2 || rafId) {
    return;
  }
  lastTime = 0;
  rafId = window.requestAnimationFrame(animate);
};

const animate = (time) => {
  if (props.frameCount < 2 || props.fps <= 0) {
    rafId = window.requestAnimationFrame(animate);
    return;
  }
  if (!lastTime) {
    lastTime = time;
  }
  const frameDuration = 1000 / props.fps;
  const delta = time - lastTime;
  if (!scrubbing.value && delta >= frameDuration) {
    const step = Math.floor(delta / frameDuration);
    const nextIndex = (frameIndex.value + step) % props.frameCount;
    if (drawFrame(nextIndex)) {
      frameIndex.value = nextIndex;
    }
    lastTime = time - (delta % frameDuration);
  }
  rafId = window.requestAnimationFrame(animate);
};

const preloadImages = () => {
  if (props.frameCount < 1) {
    return;
  }
  for (let i = 0; i < props.frameCount; i += 1) {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      images[i] = img;
      ensureCanvasSize(img);
      if (i === 0) {
        drawFrame(0);
      }
      if (props.autoPlay) {
        startAnimation();
      }
    };
    img.onerror = () => {
      images[i] = null;
    };
    img.src = withBase(`${props.pathPrefix}${pad(i)}${props.pathSuffix}`);
  }
};

const onSeekStart = () => {
  scrubbing.value = true;
};

const onSeekEnd = (event) => {
  scrubbing.value = false;
  const value = Math.min(maxFrameIndex.value, Math.max(0, Number(event.target.value)));
  frameIndex.value = value;
  drawFrame(value);
  lastTime = 0;
};

const onSeek = (event) => {
  const value = Math.min(maxFrameIndex.value, Math.max(0, Number(event.target.value)));
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
  <div class="sequence-player" :style="rootStyle">
    <canvas ref="canvasRef" class="sequence-player__canvas" role="img" />
    <div class="sequence-player__controls">
      <input
        class="sequence-player__range"
        type="range"
        min="0"
        :max="maxFrameIndex"
        step="1"
        :value="frameIndex"
        :aria-label="ariaLabel"
        @input="onSeek"
        @pointerdown="onSeekStart"
        @pointerup="onSeekEnd"
        @pointercancel="onSeekEnd"
      />
    </div>
  </div>
</template>

<style scoped>
.sequence-player {
  width: min(var(--sequence-player-max-width), 100%);
  margin: 12px auto;
  position: relative;
  background: transparent;
}

.sequence-player__canvas {
  width: 100%;
  height: auto;
  display: block;
  background: transparent;
}

.sequence-player__controls {
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

.sequence-player:hover .sequence-player__controls,
.sequence-player:focus-within .sequence-player__controls {
  opacity: 1;
  pointer-events: auto;
}

@media (hover: none) {
  .sequence-player__controls {
    opacity: 1;
    pointer-events: auto;
  }
}

.sequence-player__range {
  width: 100%;
  accent-color: var(--sequence-player-accent);
}
</style>
