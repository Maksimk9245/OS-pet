<template>
    <WindowFrame title="Browser" :icon="Chrome" @close="$emit('close')">
        <div class="browser--container">
            <iframe src="https://example.com" class="web--view"></iframe>
        </div>
    </WindowFrame>
</template>
<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { Chrome } from "lucide-vue-next";



defineEmits(["close"]);

</script>
<style scoped>
@import '../../style/Browser.css';

</style>