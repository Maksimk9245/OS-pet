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
                        <span class="name">{{ systemSettings.userName }}</span>
                        <span class="email">{{ systemSettings.userRole }}</span>
                    </div>
                </div>

                <nav class="nav-menu">
                    <a href="#"
                       v-for="tab in filteredTabs"
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
                        <input type="text" v-model="searchQuery" placeholder="Find a setting" />
                    </div>
                </div>

                <component :is="currentTabComponent" />
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
import { appZIndex, focusApp, systemSettings } from "../../../store/appState.ts";

import HomeTab from './Tabs/HomeTab.vue';
import SystemTab from './Tabs/SystemTab.vue';
import BluetoothTab from './Tabs/BluetoothTab.vue';
import NetworkTab from './Tabs/NetworkTab.vue';
import PersonalizationTab from './Tabs/PersonalizationTab.vue';
import AppsTab from './Tabs/AppsTab.vue';
import AccountsTab from './Tabs/AccountsTab.vue';
import TimeLanguageTab from './Tabs/TimeLanguageTab.vue';
import GamingTab from './Tabs/GamingTab.vue';

defineEmits(["close", "minimize"]);

const activeTab = ref('Home');
const searchQuery = ref('');

const tabsList = [
    { id: 'Home', name: 'Home', icon: Home, component: HomeTab },
    { id: 'System', name: 'System', icon: Monitor, component: SystemTab },
    { id: 'Bluetooth', name: 'Bluetooth & devices', icon: Bluetooth, component: BluetoothTab },
    { id: 'Network', name: 'Network & internet', icon: Network, component: NetworkTab },
    { id: 'Personalization', name: 'Personalization', icon: Paintbrush, component: PersonalizationTab },
    { id: 'Apps', name: 'Apps', icon: LayoutGrid, component: AppsTab },
    { id: 'Accounts', name: 'Accounts', icon: User, component: AccountsTab },
    { id: 'TimeLanguage', name: 'Time & language', icon: Clock, component: TimeLanguageTab },
    { id: 'Gaming', name: 'Gaming', icon: Gamepad2, component: GamingTab }
];

const filteredTabs = computed(() => {
    if (!searchQuery.value.trim()) return tabsList;
    const q = searchQuery.value.toLowerCase();
    return tabsList.filter(t => t.name.toLowerCase().includes(q));
});

const activeTabName = computed(() => {
    return tabsList.find(t => t.id === activeTab.value)?.name || activeTab.value;
});

const currentTabComponent = computed(() => {
    return tabsList.find(t => t.id === activeTab.value)?.component || HomeTab;
});
</script>

<style scoped>
@import '../../../style/Settings.css';
</style>