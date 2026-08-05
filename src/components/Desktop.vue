<template>
<div class="container--desktop">
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
import { appState, closeApp, appMinimized, minimizeApp } from '../store/appState.ts'
</script>

<style>
@import '../style/Desktop.css';

</style>