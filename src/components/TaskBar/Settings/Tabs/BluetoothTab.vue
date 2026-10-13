<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div class="list-item" @click="systemSettings.bluetoothEnabled = !systemSettings.bluetoothEnabled">
                <div class="item-left">
                    <Bluetooth :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Bluetooth</span>
                        <span class="desc">Discoverable as {{ systemSettings.pcName }}</span>
                    </div>
                </div>
                <div class="item-right">
                    <span>{{ systemSettings.bluetoothEnabled ? 'On' : 'Off' }}</span>
                    <div class="toggle-switch" :class="{ active: systemSettings.bluetoothEnabled }"></div>
                </div>
            </div>
            <div class="list-item">
                <div class="item-left">
                    <Plus :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Add device</span>
                        <span class="desc">Pair audio, controllers, or peripheral input devices</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
            <div class="list-item">
                <div class="item-left">
                    <Headphones :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Audio devices</span>
                        <span class="desc">Wireless Headphones (Disconnected)</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
            <div class="list-item">
                <div class="item-left">
                    <Gamepad2 :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Input & Controllers</span>
                        <span class="desc">Xbox Wireless Controller</span>
                    </div>
                </div>
                <ChevronRight :size="18" class="chevron" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Bluetooth, Plus, Headphones, Gamepad2, ChevronRight } from 'lucide-vue-next';
import { systemSettings } from "../../../../store/appState.ts";
</script>