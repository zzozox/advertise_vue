import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

import 'element-plus/theme-chalk/dark/css-vars.css'

axios.defaults.baseURL = 'http://127.0.0.1:8083/milimili'

const app = createApp(App)

// 监听 beforeunload 事件
window.addEventListener('beforeunload', () => {
    // 清空 localStorage
    localStorage.clear();
});

app.use(router)

app.mount('#app')
