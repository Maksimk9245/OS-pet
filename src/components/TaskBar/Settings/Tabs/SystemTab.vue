<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div class="list-item">
                <div class="item-left">
                    <Cpu :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Processor Cores</span>
                        <span class="desc">{{ cpuCores }} Logical CPU Cores detected</span>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <HardDrive :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Device Memory</span>
                        <span class="desc">{{ deviceRam }} RAM</span>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <Clock :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Session Uptime</span>
                        <span class="desc">{{ formattedUptime }}</span>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <Monitor :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Screen Resolution</span>
                        <span class="desc">{{ screenResolution }}</span>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <Globe :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">User Agent</span>
                        <span class="desc">{{ userAgent }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Cpu, HardDrive, Clock, Monitor, Globe } from 'lucide-vue-next';

const cpuCores = ref(navigator.hardwareConcurrency || 'N/A');
const deviceRam = ref((navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : '8+ GB');
const screenResolution = ref(`${window.screen.width} x ${window.screen.height}`);
const userAgent = ref(navigator.userAgent.slice(0, 50) + '...');

const uptimeSeconds = ref(0);
let timer: number | null = null;

onMounted(() => {
    timer = window.setInterval(() => {
        uptimeSeconds.value++;
    }, 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const formattedUptime = computed(() => {
    const hrs = Math.floor(uptimeSeconds.value / 3600);
    const mins = Math.floor((uptimeSeconds.value % 3600) / 60);
    const secs = uptimeSeconds.value % 60;
    return `${hrs}h ${mins}m ${secs}s`;
});
</script>