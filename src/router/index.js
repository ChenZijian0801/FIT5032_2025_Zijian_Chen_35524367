import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/knowledge-hub',
      name: 'knowledge-hub',
      component: () => import('@/views/KnowledgeHub.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/Community.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    }
  ]
})

export default router