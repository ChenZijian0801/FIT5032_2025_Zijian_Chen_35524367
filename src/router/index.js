import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// *** 新增：导入用户状态管理库 ***
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
      meta: { requiresAuth: true } // <-- 第1个需要保护的页面
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/Community.vue'),
      meta: { requiresAuth: true } // <-- 第2个需要保护的页面
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

// *** 新增：创建全局导航守卫 (门卫逻辑) ***
router.beforeEach((to, from, next) => {
  // 获取用户状态
  const userStore = useUserStore();
  const isLoggedIn = userStore.user.isLoggedIn;

  // 检查目标路由是否需要认证
  if (to.meta.requiresAuth && !isLoggedIn) {
    // 如果该页面需要认证，但用户未登录
    // 则重定向到登录页面
    next({ name: 'login' });
  } else {
    // 否则，正常放行
    next();
  }
});

export default router