<template>
  <el-header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <h1><a href="/" class="navbar-brand">milimili广告</a></h1>

      <!-- Spacer -->
      <div class="spacer"></div>

      <!-- Search Bar and User Section -->
      <div class="search-and-user">

        <!-- User Buttons -->
        <el-button v-if="userId==null" @click="router.push('/login')" type="text">登录</el-button>
        <div v-if="userId!=null" class="user-info">
          <el-button @click="router.push('/userCenter')" type="text" class="user-name">
            {{ user.userName }}
            <i class="el-icon-arrow-right"></i>
          </el-button>
<!--          <img :src="user.iconUrl" alt="User Icon" class="user-icon">-->
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import router from "@/router";
import axios from 'axios';

const user=ref({})
const userId=ref(sessionStorage.getItem('userId'))
const getUser=()=>{
  axios.post(`/user/getUserById/${userId.value}`,{userId:userId.value}).then(response=>{
    console.log(response.data)
    user.value=response.data;
  }).catch(error=>{
    console.log(error.message);
  })
}

onMounted(()=>{
  getUser();
})
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1;
  height: 50px;
  /* 增加左右内边距为 30px */
  padding: 0 30px;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  /* 限制内容宽度并居中 */
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  color: black;
  text-decoration: none;
  font-size: 1.25em;
}

.spacer {
  flex-grow: 1;
}

.search-and-user {
  display: flex;
  align-items: center;
}

.search-form {
  margin-right: 20px;
}

.search-input {
  width: 200px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 10px;
  color: #666666;
}

.user-icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
