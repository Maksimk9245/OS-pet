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
        <div class="fullscreen-view"
             v-else>
            <button class="nav-btn prev-btn" @click="prevImage">&lt;</button>
            <button class="wallpaper-btn" @click="setWallpaper">Сделать фоном</button>
            <img :src="selectedImage" alt="Fullscreen image">
            <button class="nav-btn next-btn" @click="nextImage">&gt;</button>
            <button class="close-btn" @click="selectedImage=null">Назад</button>
        </div>
    </WindowFrame>
</template>
<script setup lang="ts">
import WindowFrame from "../Windows/WindowFrame.vue";
import { File } from "lucide-vue-next"
import {appZIndex, focusApp, desktopWallpaper} from "../../store/appState.ts";
import { onMounted, ref } from "vue";

const imageList = ref<any[]>([]);
const selectedImage = ref (null);

const fetchImages= async () => {
    try {
        const response = await fetch('http://localhost:3000/api/images');
        imageList.value = await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке картинки", error);
    }
}

const nextImage = () => {
    const currentIndex = imageList.value.findIndex(img => img.url === selectedImage.value);
    if (currentIndex < imageList.value.length - 1) {
        selectedImage.value = imageList.value[currentIndex + 1].url;
    } else {
        selectedImage.value = imageList.value[0].url;
    }
};

const prevImage = () => {
    const currentIndex = imageList.value.findIndex(img => img.url === selectedImage.value);
    if (currentIndex > 0) {
        selectedImage.value = imageList.value[currentIndex - 1].url;
    } else {
        selectedImage.value = imageList.value[imageList.value.length - 1].url;
    }
};

onMounted(() => {
    fetchImages();
})

const setWallpaper = async () => {
    if (selectedImage.value) {
        desktopWallpaper.value = selectedImage.value;
        try {
            await fetch('http://localhost:3000/api/settings/wallpaper', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: selectedImage.value })
            });
        } catch (error) {
            console.error('Ошибка сохранения обоев в БД:', error);
        }
    }
};
defineEmits ( ["close", "minimize"]);
</script>
<style scoped>
@import '../../style/Images.css';

</style>