<template>
    <div class="content-grid">
        <div class="card col-span-2">
            <h3>{{ title }}</h3>
            <p class="subtitle">This section is currently under development.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: { type: String, required: true }
});
</script>
<style>
@import "../../../../style/Settings.css";
</style>
