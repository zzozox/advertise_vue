<template>
  <div class="video-uploader">
    <input type="file" accept="video/*" @change="uploadVideo" ref="videoInput" class="file-input">
    <button class="upload-button" @click="triggerInput"></button>
    <div class="video-container" v-if="videoSrc">
      <video :src="videoSrc" controls></video>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const videoSrc = ref('');
const videoInput = ref(null);
const emit = defineEmits(['video-uploaded']);

const uploadVideo = (event) => {
  const video = event.target.files[0];
  if (!video) return;

  videoSrc.value = URL.createObjectURL(video);
  emit('video-uploaded', video); // 将文件对象传递给父组件
};

const triggerInput = () => {
  videoInput.value.click();
};
</script>

<!--<template>-->
<!--  <div class="video-uploader">-->
<!--    <input type="file" accept="video/*" @change="uploadVideo" ref="videoInput" class="file-input">-->
<!--    <button class="upload-button" @click="triggerInput"></button>-->
<!--    <div class="video-container" v-if="videoSrc">-->
<!--      <video :src="videoSrc" controls></video>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {defineEmits, ref} from 'vue';-->
<!--import axios from "axios";-->


<!--const videoSrc = ref('');-->
<!--const videoInput = ref(null);-->
<!--const emit = defineEmits(['video-uploaded']);-->
<!--const uploadVideo = (event) => {-->
<!--  const video = event.target.files[0];-->
<!--  if (!video) return;-->

<!--  const reader = new FileReader();-->
<!--  reader.readAsDataURL(video);-->
<!--  reader.onload = (e) => {-->
<!--    videoSrc.value = e.target.result;-->
<!--    // 触发自定义事件，将 Base64 数据传递给父组件-->
<!--    emit('video-uploaded', videoSrc.value);-->
<!--  };-->
<!--  reader.onerror = (error) => {-->
<!--    console.error('Error reading video file:', error);-->
<!--  };-->
<!--};-->
<!--const triggerInput = () => {-->
<!--  videoInput.value.click();-->
<!--};-->
<!--</script>-->

<style scoped>
.video-uploader {
  text-align: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.file-input {
  display: none;
}

.upload-button {
  padding: 10px 15px;

  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.upload-button:hover {
  background-color: #45a049;
}

.video-container {
  margin-top: 20px;
}

video {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
