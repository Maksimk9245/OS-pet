<template>
    <div class="apps-settings-container">
        <div class="list-group settings-list">
            <div class="list-item">
                <div class="item-left">
                    <Clock :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Current System Time</span>
                        <span class="desc">{{ formattedTime }} ({{ timeZone }})</span>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <Calendar :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Date</span>
                        <span class="desc">{{ formattedDate }}</span>
                    </div>
                </div>
            </div>

            <div class="list-item">
                <div class="item-left">
                    <Globe :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">System Locale</span>
                        <span class="desc">{{ userLocale }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Clock, Calendar, Globe } from 'lucide-vue-next';

const now = ref(new Date());
let timer: number | null = null;

const timeZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);
const userLocale = ref(navigator.language);

const formattedTime = ref('');
const formattedDate = ref('');

const updateClock = () => {
    now.value = new Date();
    formattedTime.value = now.value.toLocaleTimeString();
    formattedDate.value = now.value.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(() => {
    updateClock();
    timer = window.setInterval(updateClock, 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>