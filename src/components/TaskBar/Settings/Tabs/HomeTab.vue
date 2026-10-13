<template>
    <div class="content-grid">
        <div class="card system-banner col-span-2">
            <div class="sys-info">
                <div class="device-icon-box">
                    <Monitor :size="40" class="sys-icon" />
                </div>
                <div class="sys-text">
                    <div class="pc-name-row" v-if="!isRenaming">
                        <h3>{{ systemSettings.pcName }}</h3>
                        <button class="rename-btn" @click="isRenaming = true" title="Rename PC">
                            <Edit2 :size="14" />
                        </button>
                    </div>
                    <div class="pc-name-edit" v-else>
                        <input type="text" v-model="editPcName" @keyup.enter="savePcName" class="edit-pc-input" />
                        <button class="save-btn" @click="savePcName">Save</button>
                        <button class="cancel-btn" @click="isRenaming = false">Cancel</button>
                    </div>
                    <p>Vue 3 + NestJS Architecture</p>
                </div>
            </div>

            <div class="sys-status">
                <div class="status-item">
                    <Wifi :size="18" class="status-icon" :class="{ active: systemSettings.wifiEnabled }" />
                    <div>
                        <span class="status-title">Network</span>
                        <span class="status-desc">{{ systemSettings.wifiEnabled ? 'Connected, secured' : 'Disconnected' }}</span>
                    </div>
                </div>

                <div class="status-item" v-if="batterySupported">
                    <Battery :size="18" class="status-icon" />
                    <div>
                        <span class="status-title">Battery</span>
                        <span class="status-desc">{{ batteryLevel }}% {{ isCharging ? '(Charging)' : '' }}</span>
                    </div>
                </div>

                <div class="status-item">
                    <RefreshCw :size="18" class="status-icon" :class="{ spinning: isCheckingUpdates }" />
                    <div>
                        <span class="status-title">System Update</span>
                        <span class="status-desc" v-if="isCheckingUpdates">Checking for updates...</span>
                        <span class="status-desc" v-else>{{ lastCheckedText }}</span>
                    </div>
                    <button class="check-update-btn" @click="checkForUpdates" :disabled="isCheckingUpdates">
                        Check
                    </button>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Recommended settings</h3>
            <p class="subtitle">Quick access to essential controls</p>
            <div class="list-group">
                <div class="list-item" @click="systemSettings.wifiEnabled = !systemSettings.wifiEnabled">
                    <div class="item-left">
                        <Wifi :size="18" />
                        <span>Wi-Fi</span>
                    </div>
                    <div class="item-right">
                        <span>{{ systemSettings.wifiEnabled ? 'On' : 'Off' }}</span>
                        <div class="toggle-switch" :class="{ active: systemSettings.wifiEnabled }"></div>
                    </div>
                </div>

                <div class="list-item" @click="systemSettings.bluetoothEnabled = !systemSettings.bluetoothEnabled">
                    <div class="item-left">
                        <Bluetooth :size="18" />
                        <span>Bluetooth</span>
                    </div>
                    <div class="item-right">
                        <span>{{ systemSettings.bluetoothEnabled ? 'On' : 'Off' }}</span>
                        <div class="toggle-switch" :class="{ active: systemSettings.bluetoothEnabled }"></div>
                    </div>
                </div>

                <div class="list-item" @click="systemSettings.nightLightEnabled = !systemSettings.nightLightEnabled">
                    <div class="item-left">
                        <Moon :size="18" />
                        <span>Night light</span>
                    </div>
                    <div class="item-right">
                        <span>{{ systemSettings.nightLightEnabled ? 'On' : 'Off' }}</span>
                        <div class="toggle-switch" :class="{ active: systemSettings.nightLightEnabled }"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Personalize your device</h3>
            <p class="subtitle">Select background theme or apply image URL</p>
            <WallpaperPicker />
        </div>

        <div class="card">
            <div class="card-header-icon"><Cloud :size="24" color="#3b82f6"/></div>
            <h3>Cloud & Browser Storage</h3>
            <p class="subtitle">Local storage allocation for Web OS state</p>
            <div class="storage-wrapper">
                <div class="storage-info">
                    <span>Used: {{ storageUsedMB }} MB</span>
                    <span>Quota: {{ storageQuotaMB }} MB</span>
                </div>
                <div class="storage-progress-bg">
                    <div class="storage-progress-fill" :style="{ width: storagePercent + '%' }"></div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header-icon"><Volume2 :size="24" color="#60cdff"/></div>
            <h3>Sound Output</h3>
            <p class="subtitle">Master volume level for Web OS media</p>
            <div class="volume-control-row">
                <Volume2 :size="18" />
                <input type="range" min="0" max="100" v-model="volumeLevel" class="volume-slider" />
                <span class="volume-val">{{ volumeLevel }}%</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Monitor, Wifi, RefreshCw, Bluetooth, Moon, Cloud, Volume2, Edit2, Battery } from 'lucide-vue-next';
import { systemSettings } from "../../../../store/appState.ts";
import WallpaperPicker from "../Components/WallpaperPicker.vue";

const editPcName = ref(systemSettings.pcName);
const isRenaming = ref(false);

const batterySupported = ref(false);
const batteryLevel = ref(100);
const isCharging = ref(true);

const isCheckingUpdates = ref(false);
const lastCheckedText = ref('Up to date');

const volumeLevel = ref(75);

const storageUsedMB = ref('1.2');
const storageQuotaMB = ref('512');
const storagePercent = ref(2);

const savePcName = () => {
    if (editPcName.value.trim()) {
        systemSettings.pcName = editPcName.value.trim();
        localStorage.setItem('os_pc_name', systemSettings.pcName);
    }
    isRenaming.value = false;
};

const checkForUpdates = () => {
    isCheckingUpdates.value = true;
    setTimeout(() => {
        isCheckingUpdates.value = false;
        lastCheckedText.value = 'Checked: Just now';
    }, 1500);
};

onMounted(async () => {
    if ('getBattery' in navigator) {
        try {
            const battery: any = await (navigator as any).getBattery();
            batterySupported.value = true;
            batteryLevel.value = Math.round(battery.level * 100);
            isCharging.value = battery.charging;

            battery.addEventListener('levelchange', () => {
                batteryLevel.value = Math.round(battery.level * 100);
            });
            battery.addEventListener('chargingchange', () => {
                isCharging.value = battery.charging;
            });
        } catch {}
    }

    if (navigator.storage && navigator.storage.estimate) {
        try {
            const estimate = await navigator.storage.estimate();
            if (estimate.usage && estimate.quota) {
                const used = (estimate.usage / (1024 * 1024)).toFixed(1);
                const quota = (estimate.quota / (1024 * 1024)).toFixed(0);
                storageUsedMB.value = used;
                storageQuotaMB.value = quota;
                storagePercent.value = Math.min(100, Math.round((estimate.usage / estimate.quota) * 100) || 1);
            }
        } catch {}
    }
});
</script>

<style scoped>
.device-icon-box {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.pc-name-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.rename-btn {
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
}

.rename-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
}

.pc-name-edit {
    display: flex;
    gap: 6px;
    align-items: center;
}

.edit-pc-input {
    background: #1a1a1a;
    border: 1px solid #60cdff;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    outline: none;
    font-size: 16px;
}

.save-btn, .cancel-btn {
    padding: 4px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.save-btn {
    background: #60cdff;
    color: black;
    font-weight: 600;
}

.cancel-btn {
    background: #444;
    color: white;
}

.spinning {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.check-update-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.2s;
}

.check-update-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.18);
}

.storage-wrapper {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.storage-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
}

.storage-progress-bg {
    width: 100%;
    height: 8px;
    background: #1a1a1a;
    border-radius: 4px;
    overflow: hidden;
}

.storage-progress-fill {
    height: 100%;
    background: #3b82f6;
    border-radius: 4px;
    transition: width 0.3s;
}

.volume-control-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
}

.volume-slider {
    flex: 1;
    accent-color: #60cdff;
    cursor: pointer;
}

.volume-val {
    font-size: 13px;
    min-width: 36px;
    color: #aaa;
}
</style>