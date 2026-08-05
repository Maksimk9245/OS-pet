<template>
    <WindowFrame title="Images"
                 :icon="File"
                 :zIndex="appZIndex.Images"
                 @focus="focusApp('Images')"
                 @close="$emit('close')"
                 @minimize="$emit('minimize')"
    >
        <div class="images--container">
            <div class="image--card"
                 v-for="image in imageList"
                 :key="image.id"
            >
                <img :src="image.url" alt="Image thumbnail"/>
            </div>
        </div>
    </WindowFrame>
</template>
<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { File } from "lucide-vue-next"
import { appZIndex, focusApp } from "../../store/appState.ts";
import { ref } from "vue";

const imageList = ref([
    {id: 1, url: 'https://picsum.photos/200?random=1'},
    {id: 2, url: 'https://picsum.photos/200?random=2'},
    {id: 3, url: 'https://picsum.photos/200?random=3'},
    {id: 4, url: 'https://picsum.photos/200?random=4'},
]);

//TODO selectedimage
defineEmits ( ["close", "minimize"]);
</script>
<style scoped>
@import '../../style/Images.css';

</style>