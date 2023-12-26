<!--<template>-->
<!--  <div class="upload-container">-->
<!--    <el-upload-->
<!--        class="upload-area"-->
<!--        list-type="picture-card"-->
<!--        action=""-->
<!--        accept=".jpg, .png"-->
<!--        :limit="1"-->
<!--        :auto-upload="false"-->
<!--        :file-list="fileList"-->
<!--        @change="getFile"-->
<!--        @preview="handlePictureCardPreview"-->
<!--        @remove="handleUploadRemove"-->
<!--        :on-exceed="handleExceed"-->
<!--    >-->
<!--      <i class="el-icon-plus"></i>-->
<!--    </el-upload>-->
<!--    <div class="image-preview" v-if="imageData">-->
<!--      <img :src="imageData">-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, defineEmits } from 'vue';-->

<!--const imageData = ref('');-->
<!--const fileList = ref([]);-->

<!--// 定义发出的事件-->
<!--const emit = defineEmits(['image-uploaded', 'image-removed']);-->

<!--const getFile = (file, newFileList) => {-->
<!--  fileList.value = newFileList.slice(-1); // 保证只处理最后一个选中的文件-->
<!--  const imageFile = file.raw;-->
<!--  imageData.value = URL.createObjectURL(imageFile);-->
<!--  emit('image-uploaded', imageFile);-->
<!--};-->

<!--const handleUploadRemove=()=>{}-->
<!--const handleExceed=()=>{}-->
<!--const handlePictureCardPreview=()=>{}-->
<!--</script>-->

<template>
  <div class="upload-container">
    <el-upload
        class="upload-area"
        list-type="picture-card"
        action=""
        accept=".jpg, .png"
        :limit="1"
        :auto-upload="false"
        :file-list="fileList"
        @change="getFile"
        @preview="handlePictureCardPreview"
        @remove="handleUploadRemove"
        :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <div class="image-preview" v-if="imageData">
      <img :src="imageData">
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { ElUpload, ElButton, ElIcon } from 'element-plus';
import axios from "axios";

const imageData = ref('');
const fileList = ref([]);

// 定义发出的事件
const emit = defineEmits(['image-uploaded', 'image-removed']);

const getFile = (file, newFileList) => {
  fileList.value = newFileList.slice(-1); // 保证只处理最后一个选中的文件
  getBase64(file.raw)
      .then(res => {
        emit('image-uploaded', res);
      })
      .catch(error => {
        console.error('Error converting to Base64:', error);
      });
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const handleUploadRemove=()=>{}
const handleExceed=()=>{}
const handlePictureCardPreview=()=>{}
</script>

<style scoped>
.upload-container {
  position: relative;
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #f9f9f9;
  text-align: center;
}

.upload-area {
  border: none;
}

.el-upload .el-upload__input {
  display: none;
}

.image-preview {
  position: relative;
  display: inline-block;
  margin-top: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.image-preview img {
  display: block;
  max-width: 100%;
  height: auto;
  transition: all 0.3s ease;
}

.image-preview:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}
</style>
