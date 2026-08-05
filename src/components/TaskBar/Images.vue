<template>
    <WindowFrame title="Images"
                 :icon="File"
                 :zIndex="appZIndex.Images"
                 @focus="focusApp('Images')"
                 @close="$emit('close')"
                 @minimize="$emit('minimize')"
    >
        <div class="images--container">

        </div>
    </WindowFrame>
</template>
<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { File } from "lucide-vue-next"
import { appZIndex, focusApp } from "../../store/appState.ts";

defineEmits ( ["close", "minimize"]);
</script>
<style scoped>
@import '../../style/Images.css';
</style>