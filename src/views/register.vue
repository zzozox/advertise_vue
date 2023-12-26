<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-left">
        <!-- 留空或添加您的插图 -->
      </div>
      <div class="register-right">
        <h1 class="register-header">注册</h1>
        <form @submit.prevent="submitRegister" class="register-form">
<!--          <div class="form-group">-->
<!--            <input type="text" id="username" v-model="registerForm.username" placeholder="用户名" required autofocus>-->
<!--          </div>-->
          <div class="form-group">
            <input type="text" id="tel" v-model="registerForm.userTel" placeholder="手机号码" required>
          </div>
          <div class="form-group">
            <input type="password" id="password" v-model="registerForm.password" placeholder="密码" required>
          </div>
<!--          <div class="form-group">-->
<!--            <input type="password" id="confirmPassword" v-model="registerForm.confirmPassword" placeholder="确认密码" required>-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="text" id="inviteCode" v-model="registerForm.inviteCode" placeholder="邀请码（如果有）">-->
<!--          </div>-->
          <button type="submit" class="btn-register">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import router from "@/router";

const registerForm = ref({
  password: '',
  userTel: '',
});

const submitRegister=()=> {
  let params = new URLSearchParams();
  params.append('userTel', registerForm.value.userTel);  // 假设 registerForm.userTel 和 registerForm.password 包含相应的值
  params.append('password', registerForm.value.password);

  axios.post('/user/userRegister', params)
      .then(response => {
        router.push('/login');
        Element.message('注册成功，请登录进行访问');
      })
      .catch(error => {
        console.log(error.message);
      });
}
</script>

<style scoped>
/* 样式基本与登录页面相同，可能需要进行小幅度的调整 */
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eef2f7;
}

.register-container {
  display: flex;
  max-width: 900px;
  width: 100%;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.register-left {
  width: 50%;
  background-image: url('../assets/1.jpg'); /* 替换为您的插图路径 */
  background-size: cover;
  background-position: center;
}

.register-right {
  width: 50%;
  padding: 40px;
}

.register-header {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.register-form {
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

.btn-register {
  background-color: #0084ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
}

.btn-register:hover {
  background-color: #0066cc;
}

.form-group input, .btn-register {
  width: 100%; /* 使输入框和按钮宽度相同 */
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.btn-register {
  background-color: #0084ff;
  color: white;
  border: none;
  padding: 10px 0; /* 增加了垂直填充以便按钮更加突出 */
  border-radius: 0.25rem;
  cursor: pointer;
}

/* 如果您想要在激活状态下按钮有不同的样式 */
.btn-register:active {
  background-color: #0056b3;
}
/* 可能需要其他样式，比如响应式设计等 */
</style>
