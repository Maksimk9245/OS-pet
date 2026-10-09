<template>
    <WindowFrame title="Settings"
                 :icon="SettingsIcon"
                 :zIndex="appZIndex.Settings"
                 @focus="focusApp('Settings')"
                 @close="$emit('close')"
                 @minimize="$emit('minimize')">

        <div class="settings-app">
            <aside class="settings-sidebar">
                <div class="user-profile">
                    <div class="avatar"><User :size="24" /></div>
                    <div class="user-info">
                        <span class="name">Maksym Balatskyi</span>
                        <span class="email">Software Engineer</span>
                    </div>
                </div>

                <nav class="nav-menu">
                    <a href="#"
                       v-for="tab in tabsList"
                       :key="tab.id"
                       class="nav-item"
                       :class="{ active: activeTab === tab.id }"
                       @click.prevent="activeTab = tab.id">
                        <component :is="tab.icon" :size="16" /> {{ tab.name }}
                    </a>
                </nav>
            </aside>

            <main class="settings-main">
                <div class="main-header">
                    <h2>{{ activeTabName }}</h2>
                    <div class="search-bar">
                        <Search :size="16" class="search-icon" />
                        <input type="text" placeholder="Find a setting" />
                    </div>
                </div>

                <component :is="currentTabComponent" :title="activeTabName" />
            </main>
        </div>
    </WindowFrame>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import WindowFrame from "../../Windows/WindowFrame.vue";
import {
    Settings as SettingsIcon, User, Home, Monitor, Bluetooth, Network,
    Paintbrush, LayoutGrid, Clock, Gamepad2, Search
} from "lucide-vue-next";
import { appZIndex, focusApp } from "../../../store/appState.ts";

import HomeTab from './Tabs/HomeTab.vue';
import AppsTab from './Tabs/AppsTab.vue';
import PlaceholderTab from './Tabs/PlaceholderTab.vue';

defineEmits(["close", "minimize"]);

const activeTab = ref('Home');

const tabsList = [
    { id: 'Home', name: 'Home', icon: Home, component: HomeTab },
    { id: 'System', name: 'System', icon: Monitor, component: PlaceholderTab },
    { id: 'Bluetooth', name: 'Bluetooth & devices', icon: Bluetooth, component: PlaceholderTab },
    { id: 'Network', name: 'Network & internet', icon: Network, component: PlaceholderTab },
    { id: 'Personalization', name: 'Personalization', icon: Paintbrush, component: HomeTab },
    { id: 'Apps', name: 'Apps', icon: LayoutGrid, component: AppsTab },
    { id: 'Accounts', name: 'Accounts', icon: User, component: PlaceholderTab },
    { id: 'TimeLanguage', name: 'Time & language', icon: Clock, component: PlaceholderTab },
    { id: 'Gaming', name: 'Gaming', icon: Gamepad2, component: PlaceholderTab }
];

const activeTabName = computed(() => {
    return tabsList.find(t => t.id === activeTab.value)?.name || activeTab.value;
});

const currentTabComponent = computed(() => {
    return tabsList.find(t => t.id === activeTab.value)?.component || PlaceholderTab;
});
</script>

<style scoped>
@import '../../../style/Settings.css';
</style>