<template>
  <header class="bg-white shadow-sm">
    <nav class="container navbar navbar-expand-lg navbar-light">
      <router-link to="/" class="navbar-brand fw-bold">
        For Mental Health
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/knowledge-hub" class="nav-link">Knowledge Hub</router-link>
          </li>
           <li class="nav-item">
            <router-link to="/community" class="nav-link">Community</router-link>
          </li>
        </ul>
        <div class="d-flex ms-lg-3">
            <div v-if="!userStore.user.isLoggedIn">
                <router-link to="/login" class="btn btn-primary">Log In</router-link>
            </div>
            <div v-else class="d-flex align-items-center">
                <span class="navbar-text me-3">Welcome, {{ userStore.user.name }} ({{ userStore.user.role }})</span>
                <button @click="userStore.logout()" class="btn btn-outline-secondary">Log Out</button>
            </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
</script>

<style scoped>
/* *** 变化在这里：更新了导航链接的样式 *** */
.nav-link {
  font-weight: 700;
  /* 为下划线动画和颜色变化添加过渡效果 */
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem; /* 为下划线留出空间 */
  
  /* 关键技巧：给所有链接一个透明的下边框，防止激活时页面跳动 */
  border-bottom: 3px solid transparent;
}

/* Vue Router 会自动为激活的链接添加 'router-link-exact-active' 类 */
.nav-link.router-link-exact-active {
  color: var(--primary-color) !important;
  /* 为激活的链接设置有颜色的下边框 */
  border-bottom-color: var(--primary-color);
}

/* 也可以为非激活链接的悬停状态添加一个细微效果 */
.nav-link:not(.router-link-exact-active):hover {
    color: var(--primary-hover-color);
}
</style>