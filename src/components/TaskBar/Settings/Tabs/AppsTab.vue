<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div class="list-item">
                <div class="item-left">
                    <LayoutList :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Installed apps</span>
                        <span class="desc">Manage apps available in your Web OS</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
            <div class="list-item">
                <div class="item-left">
                    <CheckSquare :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Default apps</span>
                        <span class="desc">Defaults for browser, images, and text files</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
            <div class="list-item">
                <div class="item-left">
                    <PlaySquare :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Startup</span>
                        <span class="desc">Apps that start automatically when OS boots</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
            <div class="list-item">
                <div class="item-left">
                    <Shield :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">App permissions</span>
                        <span class="desc">Manage camera, microphone, and location access</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LayoutList, CheckSquare, PlaySquare, Shield, ChevronRight } from 'lucide-vue-next';
</script>
<style>
@import "../../../../style/Settings.css";
</style>