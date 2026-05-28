<template>
<div class="container--desktop">
    <Browser
        v-if="appState.Browser"
        @close="closeApp('Browser')"
    />
    <Document
        v-if="appState.Documents"
        @close="closeApp('Documents')"
    />
</div>
</template>

<script setup lang="ts">
import Browser from "./TaskBar/Browser.vue";
import Document from "./TaskBar/Document.vue";
import { appState, closeApp } from '../store/appState.ts'
</script>

<style>
@import '../style/Desktop.css';

</style>