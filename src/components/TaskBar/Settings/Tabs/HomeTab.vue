<template>
    <div class="content-grid">
        <div class="card system-banner col-span-2">
            <div class="sys-info">
                <Monitor :size="48" class="sys-icon" />
                <div class="sys-text">
                    <h3>PET-OS-DEV</h3>
                    <p>Vue 3 + NestJS Architecture</p>
                    <a href="#" class="rename-link">Rename</a>
                </div>
            </div>
            <div class="sys-status">
                <div class="status-item">
                    <Network :size="20" class="status-icon" />
                    <div>
                        <span class="status-title">Network</span>
                        <span class="status-desc">{{ wifiEnabled ? 'Connected, secured' : 'Disconnected' }}</span>
                    </div>
                </div>
                <div class="status-item">
                    <RefreshCw :size="20" class="status-icon" />
                    <div>
                        <span class="status-title">System Update</span>
                        <span class="status-desc">Last checked: Just now</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Recommended settings</h3>
            <p class="subtitle">Recent and commonly used settings</p>
            <div class="list-group">
                <div class="list-item">
                    <div class="item-left"><Printer :size="18" /> Printers & scanners</div>
                    <ChevronRight :size="18" />
                </div>
                <div class="list-item" @click="wifiEnabled = !wifiEnabled">
                    <div class="item-left"><Network :size="18" /> Wi-Fi</div>
                    <div class="item-right">
                        <span>{{ wifiEnabled ? 'On' : 'Off' }}</span>
                        <div class="toggle-switch" :class="{ active: wifiEnabled }"></div>
                        <ChevronRight :size="18" />
                    </div>
                </div>
                <div class="list-item">
                    <div class="item-left"><ImageIcon :size="18" /> Pictures</div>
                    <ChevronRight :size="18" />
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Personalize your device</h3>
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

        <div class="side-cards">
            <div class="card">
                <div class="card-header-icon"><Cloud :size="24" color="#3b82f6"/></div>
                <h3>Cloud storage</h3>
                <p class="subtitle">Everything is synced and backed up to your local SQLite database.</p>
            </div>

            <div class="card">
                <h3>Bluetooth devices</h3>
                <p class="subtitle">Manage, add, and remove devices</p>
                <div class="list-item mt-4" @click="bluetoothEnabled = !bluetoothEnabled">
                    <div class="item-left"><Bluetooth :size="18" /> Bluetooth</div>
                    <div class="item-right">
                        <span>{{ bluetoothEnabled ? 'On' : 'Off' }}</span>
                        <div class="toggle-switch" :class="{ active: bluetoothEnabled }"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Monitor, Network, RefreshCw, Printer, ChevronRight, Image as ImageIcon, Cloud, Bluetooth } from 'lucide-vue-next';
import { desktopWallpaper } from "../../../../store/appState.ts";

const newWallpaperUrl = ref('');
const wifiEnabled = ref(true);
const bluetoothEnabled = ref(false);

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
<style>
@import "../../../../style/Settings.css";
</style>