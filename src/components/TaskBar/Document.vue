<template>
    <WindowFrame title="Document"
                 :icon="File"
                 :zIndex="appZIndex.Documents"
                 @focus="focusApp('Documents')"
                 @close="$emit('close')"
    >
        <div class="document--container">
            <textarea class="notepad-area"></textarea>
        </div>
    </WindowFrame>
</template>

<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { File } from "lucide-vue-next"
import { appZIndex, focusApp } from "../../store/appState.ts";


defineEmits(['close'])



</script>

<style scoped>
@import '../../style/Document.css';
</style>