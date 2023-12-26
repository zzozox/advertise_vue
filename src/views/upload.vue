<template>
  <Header></Header>
  <div class="form-container">
    <form class="video-form">
      <div class="form-group">
        <label for="videoTitle">广告标题:</label>
        <input v-model="form.name" required>
      </div>
    </form>
    <image-upload @image-uploaded="handleImageUploaded"></image-upload>
    <el-button @click="handin">立即提交</el-button>
  </div>
  <Footer></Footer>
</template>

<script setup>
import ImageUpload from "@/component/upload/imageUpload.vue";
import axios from "axios";
import { ref } from 'vue';
import {useRoute} from "vue-router";
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";
import router from "@/router";
const route=useRoute();
const userId=ref(sessionStorage.getItem('userId'))
const image=ref('')
const form = ref({
  advertisementId:route.query.advertisementIid,
  name: '',
  click:0,
  typeId:0,
  uploadTime:null,
  advertiserId:userId.value,
  stateId:null,
  url:null
});
// 获取上传的图片的base64编码
// const handleImageUploaded = (base64Image) => {
//   image.value=base64Image;
//   console.log('接收到的图片Base64数据：',image.value)
// };
const handleImageUploaded = (base64Image) => {
  // 移除前缀
  const base64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
  image.value = base64;
  console.log('接收到的图片Base64数据（已移除前缀）：', image.value);
};

const handin=()=>{
  axios.post('/advertisement/uploadeAdImage',{
      advertisement:{
        advertisementId:form.value.advertisementId,
        name: form.value.name,
        advertiserId:userId.value,
      },
      image:image.value
  }).then(response=>{
    ElMessage.success('上传视频信息成功')
    router.push('/')
  }).catch (error=> {
    console.log(error.message)
    ElMessage.warning('上传失败')
  })
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.video-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
}

.el-button {
  display: block;
  width: 100%;
  margin-top: 10px;
}
</style>
