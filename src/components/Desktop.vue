<template>
    <div class="container--desktop" :style="{ backgroundImage: `url(${desktopWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <Browser
            v-if="appState.Browser"
            v-show="!appMinimized.Browser"
            @minimize="minimizeApp('Browser')"
            @close="closeApp('Browser')"
        />
        <Document
            v-if="appState.Documents"
            v-show="!appMinimized.Documents"
            @minimize="minimizeApp('Documents')"
            @close="closeApp('Documents')"
        />
        <Images
            v-if="appState.Images"
            v-show="!appMinimized.Images"
            @minimize="minimizeApp('Images')"
            @close="closeApp('Images')"
        />
    </div>
</template>

<script setup lang="ts">
import Browser from "./TaskBar/Browser.vue";
import Document from "./TaskBar/Document.vue";
import Images from "./TaskBar/Images.vue";
import { appState, closeApp, appMinimized, minimizeApp, desktopWallpaper } from '../store/appState.ts'
import { onMounted } from 'vue';
onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/settings/wallpaper');
        const data = await response.json();
        if (data.url) {
            desktopWallpaper.value = data.url;
        }
    } catch (error) {
        console.error('Ошибка загрузки обоев при старте:', error);
    }
});
</script>

<style>
@import '../style/Desktop.css';
</style>