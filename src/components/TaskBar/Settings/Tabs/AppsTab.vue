<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div v-for="app in installedApps" :key="app.id" class="list-item">
                <div class="item-left">
                    <component :is="app.icon" :size="20" class="item-icon" />
                    <div class="item-text">
                        <span class="title">{{ app.name }}</span>
                        <span class="desc">Status: {{ isAppRunning(app.id) ? 'Running' : 'Closed' }}</span>
                    </div>
                </div>
                <div class="item-right">
                    <button class="app-btn" :class="{ close: isAppRunning(app.id) }" @click="toggleApp(app.id)">
                        {{ isAppRunning(app.id) ? 'Close' : 'Launch' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Globe, FileText, Image as ImageIcon, Settings as SettingsIcon } from 'lucide-vue-next';
import { appState, closeApp } from "../../../../store/appState.ts";

const installedApps = [
    { id: 'Browser', name: 'Browser', icon: Globe },
    { id: 'Documents', name: 'Documents', icon: FileText },
    { id: 'Images', name: 'Gallery / Images', icon: ImageIcon },
    { id: 'Settings', name: 'Settings', icon: SettingsIcon },
];

const isAppRunning = (appId: string) => {
    return !!(appState as any)[appId];
};

const toggleApp = (appId: string) => {
    if (isAppRunning(appId)) {
        closeApp(appId as any);
    } else {
        (appState as any)[appId] = true;
    }
};
</script>

<style scoped>
.app-btn {
    padding: 6px 14px;
    background: #60cdff;
    color: #000;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}

.app-btn.close {
    background: #ff6767;
    color: #fff;
}
</style>