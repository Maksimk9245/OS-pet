<template>
    <div class="start-menu">
        <div class="search-container">
            <Search class="search-icon" :size="18" />
            <input type="text" placeholder="Поиск программ и файлов..." class="search-input" />
        </div>

        <div class="apps-grid">
            <button class="app-tile" v-for="app in startApps" :key="app.name">
                <div class="app-icon">
                    <component :is="app.icon" :size="24" />
                </div>
                <span class="app-name">{{ app.name }}</span>
            </button>
        </div>

        <div class="menu-footer">
            <div class="user-profile">
                <div class="avatar">
                    <User :size="18" />
                </div>
                <span class="username">Guest User</span>
            </div>
            <button class="power-btn" title="Выключение">
                <Power :size="18" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search, User, Power, Calculator, Calendar, Mail, Music, Map, Camera } from 'lucide-vue-next';

const startApps = [
    {name : 'Calculator', icon: Calculator},
    {name : 'Calendar', icon: Calendar},
    {name : 'Mail', icon: Mail},
    {name : 'Music', icon: Music},
    {name : 'Map', icon: Map},
    {name : 'Camera', icon: Camera},

];
</script>

<style scoped>
@import '../../style/Startmenu.css';
</style>