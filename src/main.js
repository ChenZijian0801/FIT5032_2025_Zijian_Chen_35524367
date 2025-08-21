import { createApp } from 'vue'
import { createPinia } from 'pinia'
// *** 变化在这里 (1/2)：导入 userStore ***
import { useUserStore } from './stores/userStore' 

import App from './App.vue'
import router from './router'

// 引入样式
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/base.css'

// 引入 Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App)

// 必须先注册 Pinia
app.use(createPinia())

// *** 变化在这里 (2/2)：在挂载 router 之前，初始化用户状态监听 ***
// 这会启动 onAuthStateChanged 监听器，让应用实时了解用户的登录状态
const userStore = useUserStore()
userStore.init()

// 然后再挂载 router 和整个应用
app.use(router)
app.mount('#app')