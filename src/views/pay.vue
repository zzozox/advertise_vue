<template>
  <Header></Header>
  <div class="container">
    <!-- Image container -->
    <div class="image-container">
      <img src="../assets/1.jpg" alt="示例图片" />
    </div>

    <!-- Payment widget -->
    <div class="payment-widget">
      <el-input v-model="price" placeholder="请输入信息" />
      <el-button type="primary" @click="pay">支付</el-button>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref } from 'vue';
import router from "@/router";
import axios from "axios";
import Header from "@/component/Header.vue";
import Footer from "@/component/Footer.vue";

const userId=ref()
userId.value=sessionStorage.getItem("userId")
const price = ref();
const advertise=ref()
const pay = () => {
  const params=new URLSearchParams();
  params.append("buyerId",userId.value)
  params.append("money",price.value)
  axios.post('/advertisement/buyIdByUserId',params).then(response=>{
    advertise.value=response.data.data;
    console.log('advertise.value',advertise.value)
    router.push({path:'/upload',query:{advertisementId:advertise.value.advertisement_id}})
  }).catch(error=>{
    console.log(error.message)
  })
};
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.image-container {
  flex: 1;
  max-width: 50%;
  padding: 10px;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.payment-widget {
  flex: 1;
  max-width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.payment-widget p {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .image-container,
  .payment-widget {
    max-width: 100%;
  }

  .image-container img {
    max-height: 40vh;
  }
}
</style>
