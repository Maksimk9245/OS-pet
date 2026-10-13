<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div class="list-item" @click="systemSettings.wifiEnabled = !systemSettings.wifiEnabled">
                <div class="item-left">
                    <Wifi :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Internet Connection</span>
                        <span class="desc">{{ systemSettings.wifiEnabled ? 'Online (Connected to global network)' : 'Offline (No internet access)' }}</span>
                    </div>
                </div>
                <div class="item-right">
                    <span :style="{ color: systemSettings.wifiEnabled ? '#60cdff' : '#ff6767' }">{{ systemSettings.wifiEnabled ? 'Connected' : 'Disconnected' }}</span>
                    <div class="toggle-switch" :class="{ active: systemSettings.wifiEnabled }"></div>
                </div>
            </div>

            <div class="list-item" @click="checkBackend">
                <div class="item-left">
                    <Globe :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">NestJS Backend Connection</span>
                        <span class="desc">http://localhost:3000 • Latency: {{ pingLatency ? pingLatency + ' ms' : 'Checking...' }}</span>
                    </div>
                </div>
                <div class="item-right">
                    <span :style="{ color: backendConnected ? '#60cdff' : '#ff6767' }">
                        {{ backendConnected ? 'Active' : 'Unreachable' }}
                    </span>
                    <RefreshCw :size="16" class="chevron" />
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <ShieldCheck :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Network Type</span>
                        <span class="desc">{{ connectionType }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Wifi, Globe, ShieldCheck, RefreshCw } from 'lucide-vue-next';
import { systemSettings } from "../../../../store/appState.ts";

const backendConnected = ref(false);
const pingLatency = ref<number | null>(null);

const navConn = (navigator as any).connection;
const connectionType = ref(navConn?.effectiveType ? `Broadband (${navConn.effectiveType.toUpperCase()})` : 'Ethernet / Wi-Fi');

const checkBackend = async () => {
    const start = performance.now();
    try {
        const res = await fetch('http://localhost:3000/api/settings/wallpaper');
        const end = performance.now();
        if (res.ok) {
            backendConnected.value = true;
            pingLatency.value = Math.round(end - start);
            return;
        }
    } catch {
        backendConnected.value = false;
        pingLatency.value = null;
    }
};

onMounted(() => {
    checkBackend();
});
</script>