<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <!-- 留空或添加您的插图 -->
      </div>
      <div class="login-right">
        <h1 class="login-header">登录</h1>
        <form @submit.prevent="submitLogin" class="login-form">
          <div class="form-group">
            <input type="text" id="userTel" v-model="loginForm.userTel" placeholder="手机号码" required autofocus>
          </div>
          <div class="form-group">
            <input type="password" id="password" v-model="loginForm.password" placeholder="密码" required>
          </div>
          <div class="form-group">
            <input v-model="loginForm.aCode" placeholder="验证码" required>
          </div>
          <img :src="'data:image/jpeg;base64,'+acodeImg" @click="getAcodeImg" alt="验证码">
          <button type="submit" class="btn-login">登录</button>
          <div class="text-center">
            <a :href="registerUrl" class="link-register">注册账号</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import { ElMessage } from 'element-plus';

const acodeImg = ref('');
const loginForm = ref({
  userTel: '',
  password: '',
  aCode: ''
});
const registerUrl = '/register'; // 修改为您的注册页面URL

// 获取验证码
const getAcodeImg = () => {
  axios.get('/user/getKey')
      .then(response => {
        acodeImg.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching the captcha image:', error);
      });
}
// 提交登录表单
const submitLogin = () => {
  let params = new URLSearchParams();
  params.append('userTel',loginForm.value.userTel)
  params.append('password',loginForm.value.password)
  params.append('aCode',loginForm.value.aCode)
  axios.post('/user/userLogin', params)
      .then(response => {
        if (response.data.result) {
          // 假设 response.data.data 包含用户信息
          // sessionStorage.setItem('userInfo', JSON.stringify(response.data.data));
          sessionStorage.setItem('userId', response.data.data.userId);
          console.log(response.data.data.userId)
          ElMessage.success('登录成功');
          router.push('/pay');
        } else {
          // 登录失败的消息
          ElMessage.error(response.data.message || '登录失败');
        }
      })
      .catch(error => {
        ElMessage.error(error.message);
      });
}

// 组件加载时获取验证码
onMounted(() => {
  getAcodeImg();
});
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eef2f7;
}

.login-container {
  display: flex;
  max-width: 900px;
  width: 100%;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.login-left {
  width: 50%;
  background-image: url('../assets/1.jpg'); /* 替换为您的插图路径 */
  background-size: cover;
  background-position: center;
}

.login-right {
  width: 50%;
  padding: 40px;
}

.login-header {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn-login {
  background-color: #0084ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
}

.btn-login:hover {
  background-color: #0066cc;
}

.text-center {
  text-align: center;
  margin-top: 10px;
}

.link-register {
  color: #0084ff;
  text-decoration: none;
}

.link-register:hover {
  text-decoration: underline;
}

.form-group input, .btn-login {
  width: 100%; /* This ensures that the width is the same as the parent */
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
}

.btn-login {
  background-color: #0084ff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}
</style>
