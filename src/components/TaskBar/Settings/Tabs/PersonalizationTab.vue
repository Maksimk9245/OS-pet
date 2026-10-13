<template>
    <div class="apps-settings-container">
        <div class="card mb-4">
            <h3>Desktop Wallpaper</h3>
            <div class="mt-2">
                <WallpaperPicker />
            </div>
        </div>

        <div class="list-group settings-list">
            <div class="list-item">
                <div class="item-left">
                    <Palette :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Accent Colors</span>
                        <span class="desc">Windows 11 Dark theme accent (#60cdff)</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
            <div class="list-item">
                <div class="item-left">
                    <Paintbrush :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Theme Mode</span>
                        <span class="desc">Dark Theme (Default)</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Palette, Paintbrush, ChevronRight } from 'lucide-vue-next';
import WallpaperPicker from "../Components/WallpaperPicker.vue";
</script>