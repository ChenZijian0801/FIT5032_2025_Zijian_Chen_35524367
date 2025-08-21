import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { useUserStore } from '@/stores/userStore';

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
      component: () => import('@/views/KnowledgeHub.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/Community.vue'),
      meta: { requiresAuth: true } 
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
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('@/views/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/map',
      name: 'map-view',
      component: () => import('@/views/MapView.vue'),
      meta: { requiresAuth: true }
    },
    // *** 新增的联系页面路由 ***
    {
      path: '/contact',
      name: 'contact-us',
      component: () => import('@/views/ContactView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.user.isLoggedIn;
  const userRole = userStore.user.role;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } 
  else if (to.meta.requiresAdmin && userRole !== 'admin') {
    alert('Access Denied: This page is for administrators only.');
    next({ name: 'home' });
  } 
  else {
    next();
  }
});

export default router