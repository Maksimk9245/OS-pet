<template>
<div class="container--desktop">
    <Browser
        v-if="appState.Browser"
        @close="closeApp('Browser')"
    />
</div>
</template>

<script setup lang="ts">
import Browser from "./TaskBar/Browser.vue";
import { appState, closeApp } from '../store/appState.ts'
</script>

<style>
@import '../style/Desktop.css';

</style>