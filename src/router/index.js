import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue' 
import FirebaseSignInView from '../views/FirebaseSigninView.vue' 
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue' 
import WeatherView from '../views/WeatherView.vue' 
// <-- 新增：导入 CountBookAPI 组件
import CountBookAPI from '../views/CountBookAPI.vue' 

import { isAuthenticated } from '../auth' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/login', 
    name: 'login',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignInView
  },
  {
    path: '/FireRegister', 
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/weather', 
    name: 'Weather',
    component: WeatherView
  },
  {
    // <-- 新增：CountBookAPI 路由
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'FireLogin' } 
  }

  if ((to.name === 'login' || to.name === 'FireLogin' || to.name === 'FireRegister') && isAuthenticated.value) {
    return { name: 'about' } 
  }
  
  return true
})

export default router