// src/main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入全局样式
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/base.css'

// *** 新增在这里：全局导入 Bootstrap 的 JS 包 ***
// 这会让所有 Bootstrap 的交互组件（模态框、手风琴、下拉菜单等）在整个网站生效
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')