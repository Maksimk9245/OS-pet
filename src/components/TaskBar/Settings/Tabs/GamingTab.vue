<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div class="list-item">
                <div class="item-left">
                    <Activity :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Live Rendering FPS</span>
                        <span class="desc">Current frame rate: {{ fps }} FPS</span>
                    </div>
                </div>
            </div>

            <div class="list-item" @click="gameMode = !gameMode">
                <div class="item-left">
                    <Zap :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Game Mode Acceleration</span>
                        <span class="desc">Prioritize GPU and CPU cycles for Web OS windows</span>
                    </div>
                </div>
                <div class="item-right">
                    <span>{{ gameMode ? 'On' : 'Off' }}</span>
                    <div class="toggle-switch" :class="{ active: gameMode }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Zap, Activity } from 'lucide-vue-next';

const gameMode = ref(true);
const fps = ref(60);

let frameCount = 0;
let lastTime = performance.now();
let animId: number | null = null;

const calcFps = () => {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
        fps.value = frameCount;
        frameCount = 0;
        lastTime = now;
    }
    animId = requestAnimationFrame(calcFps);
};

onMounted(() => {
    animId = requestAnimationFrame(calcFps);
});

onUnmounted(() => {
    if (animId) cancelAnimationFrame(animId);
});
</script>