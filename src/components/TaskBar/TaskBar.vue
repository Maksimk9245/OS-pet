<template>
    <Startmenu v-if="isStartmenuOpen" />
    <div class="container--taskbar">
        <div class="task--btn--container">

            <div class="start--btn">
                <button class="icon-btn" @click="isStartmenuOpen = !isStartmenuOpen">
                    <Menu />
                </button>
            </div>
            <div class="app--list">
                <button
                    class="icon-btn"
                    v-for="app in pinnedApps"
                    :key="app.name"
                    :class ="{'backlight': appState[app.name]}"
                    @click="toggleApp(app.name)"
                >
                    <component :is="app.icon" />
                </button>
            </div>

            <div class="system--tray">
                <button class="icon-btn"><Wifi /></button>
                <button class="icon-btn"><Battery /></button>
                <button class="icon-btn"><Volume2 /></button>
                <div class="clock--widget">
                    <div>{{ timeString }}</div>
                    <div>{{ dateString }}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Startmenu from './Startmenu.vue';
import { Menu, Chrome, FileText, Image, Settings, Wifi, Battery, Volume2 } from 'lucide-vue-next';
import { toggleApp, appState } from '../../store/appState.ts'

const isStartmenuOpen = ref(false);

type AppName = 'Browser' | 'Documents' | 'Images' | 'Settings';
const pinnedApps: { name: AppName, icon: any }[] = [
    {name: 'Browser', icon: Chrome },
    {name: 'Documents', icon: FileText },
    {name: 'Images', icon: Image },
    {name: 'Settings', icon: Settings },
]

const timeString = ref('');
const dateString = ref('');
let timer: ReturnType<typeof setInterval>;

const updateClock = () => {
    const now = new Date();
    timeString.value = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    dateString.value = now.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
};

onMounted(() => {
    updateClock();
    timer = setInterval(updateClock, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style scoped>
@import '../../style/TaskBar.css';
</style>