<template>
    <div class="start-menu-overlay" @click="$emit('close')">
        <div class="start-menu" @click.stop>
            <div class="search-section">
                <div class="start-search-bar">
                    <Search :size="16" class="search-icon" />
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Type here to search..."
                    />
                </div>
            </div>

            <div class="menu-content">
                <div class="section-header">
                    <span>Pinned</span>
                    <button class="all-apps-btn">All apps &gt;</button>
                </div>

                <div class="apps-grid">
                    <div
                        v-for="app in filteredApps"
                        :key="app.id"
                        class="app-item"
                        @click="launchApp(app.id)"
                    >
                        <div class="app-icon-wrapper" :style="{ backgroundColor: app.bgColor }">
                            <component :is="app.icon" :size="24" color="#ffffff" />
                        </div>
                        <span class="app-label">{{ app.name }}</span>
                    </div>
                </div>

                <div class="section-header mt-4">
                    <span>Recommended</span>
                    <button class="all-apps-btn">More &gt;</button>
                </div>

                <div class="recommended-list">
                    <div class="rec-item" @click="launchApp('Documents')">
                        <FileText :size="20" class="rec-icon" />
                        <div class="rec-details">
                            <span class="rec-title">System Notes.txt</span>
                            <span class="rec-time">Recently created</span>
                        </div>
                    </div>
                    <div class="rec-item" @click="launchApp('Images')">
                        <ImageIcon :size="20" class="rec-icon" />
                        <div class="rec-details">
                            <span class="rec-title">Desktop Wallpaper.png</span>
                            <span class="rec-time">Opened 10m ago</span>
                        </div>
                    </div>
                    <div class="rec-item" @click="launchApp('Settings')">
                        <SettingsIcon :size="20" class="rec-icon" />
                        <div class="rec-details">
                            <span class="rec-title">System Settings</span>
                            <span class="rec-time">Configured recently</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="user-footer">
                <div class="profile-info">
                    <div class="user-avatar">
                        <User :size="20" />
                    </div>
                    <div class="user-text">
                        <span class="user-name">{{ systemSettings.userName }}</span>
                        <span class="user-role">{{ systemSettings.userRole }}</span>
                    </div>
                </div>

                <div class="power-wrapper">
                    <button class="power-btn" @click.stop="showPowerMenu = !showPowerMenu" title="Power">
                        <Power :size="18" />
                    </button>

                    <div class="power-flyout" v-if="showPowerMenu" @click.stop>
                        <div class="power-option" @click="handlePowerAction('sleep')">
                            <Moon :size="16" />
                            <span>Sleep</span>
                        </div>
                        <div class="power-option" @click="handlePowerAction('restart')">
                            <RotateCcw :size="16" />
                            <span>Restart</span>
                        </div>
                        <div class="power-option" @click="handlePowerAction('shutdown')">
                            <Power :size="16" />
                            <span>Shut down</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Search, Globe, FileText, Image as ImageIcon, Settings as SettingsIcon,
    Power, User, Moon, RotateCcw
} from 'lucide-vue-next';
import { toggleApp, systemSettings, appState } from '../../store/appState.ts';

const emit = defineEmits(['close']);

const searchQuery = ref('');
const showPowerMenu = ref(false);

const appsList = [
    { id: 'Browser', name: 'Browser', icon: Globe, bgColor: '#2563eb' },
    { id: 'Documents', name: 'Documents', icon: FileText, bgColor: '#059669' },
    { id: 'Images', name: 'Gallery', icon: ImageIcon, bgColor: '#d97706' },
    { id: 'Settings', name: 'Settings', icon: SettingsIcon, bgColor: '#4f46e5' },
];

const filteredApps = computed(() => {
    if (!searchQuery.value.trim()) return appsList;
    const q = searchQuery.value.toLowerCase();
    return appsList.filter(a => a.name.toLowerCase().includes(q));
});

const launchApp = (appId: string) => {
    toggleApp(appId as keyof typeof appState);
    emit('close');
};

const handlePowerAction = (action: string) => {
    showPowerMenu.value = false;
    if (action === 'shutdown' || action === 'restart') {
        window.location.reload();
    } else {
        emit('close');
    }
};
</script>

<style scoped>
@import '../../style/Startmenu.css';
</style>