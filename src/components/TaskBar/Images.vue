<template>
    <WindowFrame title="Images"
                 :icon="File"
                 :zIndex="appZIndex.Images"
                 @focus="focusApp('Images')"
                 @close="$emit('close')"
                 @minimize="$emit('minimize')"
    >
        <div class="images--container"
             v-if="selectedImage===null"
        >
            <div class="image--card"
                 v-for="image in imageList"
                 :key="image.id"
                 @click="selectedImage = image.url"
            >
                <img :src="image.url" alt="Image thumbnail"/>
            </div>
        </div>
        <div class="fullscreen-view" v-else>
            <button class="nav-btn prev-btn" @click="prevImage"> &lt; </button>
            <img :src="selectedImage" />
            <button class="nav-btn next-btn" @click="nextImage"> &gt; </button>
            <button class="close-btn" @click="selectedImage = null">Назад</button>
        </div>
    </WindowFrame>
</template>
<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { File } from "lucide-vue-next"
import {appZIndex, focusApp} from "../../store/appState.ts";
import { ref } from "vue";

const imageList = ref([
    {id: 1, url: 'https://picsum.photos/1920/1080?random=1'},
    {id: 2, url: 'https://picsum.photos/1920/1080?random=2'},
    {id: 3, url: 'https://picsum.photos/1920/1080?random=3'},
    {id: 4, url: 'https://picsum.photos/1920/1080?random=4'},
]);

const selectedImage = ref <string | null>(null);

const nextImage = () =>{
    const currentIndex = imageList.value.findIndex(img => img.url === selectedImage.value);
    if (currentIndex < imageList.value.length - 1) {
        selectedImage.value = imageList.value[currentIndex + 1].url;
    } else {
        selectedImage.value = imageList.value[0].url;
    }
};
const prevImage = () =>{
    const currentIndex = imageList.value.findIndex(img => img.url === selectedImage.value);
    if( currentIndex > 0) {
        selectedImage.value = imageList.value[currentIndex -1].url
    } else {
        selectedImage.value =imageList.value[imageList.value.length - 1].url;
    }
}

defineEmits ( ["close", "minimize"]);
</script>
<style scoped>
@import '../../style/Images.css';

</style>






























