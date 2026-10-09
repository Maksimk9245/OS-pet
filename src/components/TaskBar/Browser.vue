<template>
    <WindowFrame title="Browser"
                 :icon="Chrome"
                 :zIndex="appZIndex.Browser"
                 @focus="focusApp('Browser')"
                 @close="$emit('close')"
                 @minimize="$emit('minimize')">
        <div class="browser--container">
            <div class="browser-toolbar">
                <div class="browser-nav-buttons">
                    <button @click="goBack">←</button>
                    <button @click="goForward">→</button>
                    <button @click="reloadPage">⟳</button>
                </div>

                <form @submit.prevent="navigateToUrl" class="browser-address-bar">
                    <input
                        type="text"
                        v-model="inputUrl"
                        placeholder="Введите URL (http://info.cern.ch)"
                    />
                    <button type="submit">Перейти</button>
                </form>
            </div>

            <div class="browser-content">
                <iframe :src="currentUrl" class="web--view" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
            </div>
        </div>
    </WindowFrame>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WindowFrame from "../Windows/WindowFrame.vue";
import { Chrome } from "lucide-vue-next";
import { appZIndex, focusApp } from "../../store/appState.ts";

defineEmits(["close", "minimize"]);

const currentUrl = ref('https://en.wikipedia.org/wiki/Main_Page');
const inputUrl = ref('https://en.wikipedia.org/wiki/Main_Page');

const navigateToUrl = () => {
    let target = inputUrl.value.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
        target = 'https://' + target;
    }
    currentUrl.value = target;
    inputUrl.value = target;
};

const goBack = () => {
    reloadPage();
};

const goForward = () => {
    reloadPage();
};

const reloadPage = () => {
    const temp = currentUrl.value;
    currentUrl.value = '';
    setTimeout(() => {
        currentUrl.value = temp;
    }, 50);
};
</script>

<style scoped>
@import '../../style/Browser.css';
</style>