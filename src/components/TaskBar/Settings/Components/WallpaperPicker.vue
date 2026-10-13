<template>
    <div class="wallpaper-picker">
        <div class="wallpaper-grid">
            <div class="wallpaper-preview bg-default" @click="applyWallpaper('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')"></div>
            <div class="wallpaper-preview bg-dark" @click="applyWallpaper('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop')"></div>
            <div class="wallpaper-preview bg-light" @click="applyWallpaper('https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2564&auto=format&fit=crop')"></div>
            <div class="wallpaper-preview bg-abstract" @click="applyWallpaper('https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2564&auto=format&fit=crop')"></div>
        </div>
        <div class="custom-wallpaper">
            <input
                type="text"
                v-model="newWallpaperUrl"
                placeholder="Paste image URL here..."
                @keyup.enter="applyWallpaper()"
            />
            <button @click="applyWallpaper()">Apply</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { desktopWallpaper } from "../../../../store/appState.ts";

const newWallpaperUrl = ref('');

const applyWallpaper = async (url?: string) => {
    const targetUrl = url || newWallpaperUrl.value.trim();
    if (!targetUrl) return;

    try {
        const response = await fetch('http://localhost:3000/api/settings/wallpaper', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: targetUrl })
        });

        if (response.ok) {
            desktopWallpaper.value = targetUrl;
            if (!url) newWallpaperUrl.value = '';
        }
    } catch (error) {
        console.error(error);
    }
};
</script>