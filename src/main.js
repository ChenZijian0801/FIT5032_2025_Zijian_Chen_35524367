import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/userStore'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/base.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(createPinia())

const userStore = useUserStore()
userStore.init() // 在这里一次性启动监听

app.use(router)
app.mount('#app')