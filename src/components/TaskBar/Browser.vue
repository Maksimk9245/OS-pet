<template>
    <WindowFrame title="Browser"
                 :icon="Chrome"
                 :zIndex="appZIndex.Browser"
                 @focus="focusApp('Browser')"
                 @close="$emit('close')"
    >
        <div class="browser--container">
            <iframe src="https://example.com" class="web--view"></iframe>
        </div>
    </WindowFrame>
</template>
<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { Chrome } from "lucide-vue-next";
import {appZIndex, focusApp} from "../../store/appState.ts";



defineEmits(["close"]);

</script>
<style scoped>
@import '../../style/Browser.css';

</style>