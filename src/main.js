<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// --- START: Firebase Initialization (Moved to a separate file) ---
// 从新的init.js文件导入Firebase app实例
import './firebase/init'; // 仅仅导入以确保Firebase被初始化
// 如果你需要在main.js中使用Firebase app实例本身（例如传递给某些组件），可以这样导入：
// import firebaseApp from './firebase/init';
// --- END: Firebase Initialization ---


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

=======
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
createApp(App).mount('#app')
>>>>>>> 1a06f5027117fb439b709548846240d75310e8b7
