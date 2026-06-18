<template>
    <div
        class="window-frame"
        :class="{ 'is-maximized': isMaximized }"
        :style="windowStyle"
        @mousedown="$emit('focus')"
    >
        <div class="window-header" @mousedown="startDrag" @dblclick="toggleMaximize">
            <div class="header-left">
                <component :is="icon" v-if="icon" :size="16" class="header-icon" />
                <span class="header-title">{{ title }}</span>
            </div>
            <div class="header-controls">
                <button class="control-btn minimize" @mousedown.stop>
                    <Minus :size="16" />
                </button>
                <button class="control-btn maximize" @mousedown.stop @click="toggleMaximize">
                    <Square :size="14" />
                </button>
                <button class="control-btn close" @mousedown.stop @click="$emit('close')">
                    <X :size="16" />
                </button>
            </div>
        </div>
        <div class="window-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Minus, Square, X } from 'lucide-vue-next';

defineEmits(['close', 'focus']);

const isMaximized = ref(false);
const position = ref({ x: 100, y: 100 });
const size = ref({ width: 600, height: 400 });
const props = defineProps ({
    title: { type: String, default: 'Program' },
    icon: { type: [Object, Function], default: null },
    zIndex: { type: Number, default: 100 },
})
const windowStyle = computed(() => {
    if (isMaximized.value) {
        return {
            top: 0,
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 50px)',
            transform: 'none',
            zIndex: props.zIndex,
        };
    }
    return {
        top: position.value.y + 'px',
        left: position.value.x + 'px',
        width: size.value.width + 'px',
        height: size.value.height + 'px',
        zIndex: props.zIndex,
    };
});
const toggleMaximize = () => {
    isMaximized.value = !isMaximized.value;
};
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

const startDrag = (e: MouseEvent) => {
    if (isMaximized.value) return;

    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startPosX = position.value.x;
    startPosY = position.value.y;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e: MouseEvent) => {
    position.value.x = startPosX + (e.clientX - startMouseX);
    position.value.y = startPosY + (e.clientY - startMouseY);
};

const stopDrag = () => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
};
</script>

<style scoped>
@import '../../style/WindowsFrame.css';
</style>