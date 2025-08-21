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
          <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
          <li class="nav-item"><router-link to="/knowledge-hub" class="nav-link">Knowledge Hub</router-link></li>
          <li class="nav-item"><router-link to="/community" class="nav-link">Community</router-link></li>
          <li class="nav-item"><router-link to="/map" class="nav-link">Map</router-link></li>
          <li v-if="userStore.user.role === 'admin'" class="nav-item">
           <router-link to="/admin" class="nav-link">User Management</router-link>
          </li>
        </ul>
        <div class="d-flex ms-lg-3">
          <div v-if="!userStore.user.isLoggedIn">
            <router-link to="/login" class="btn btn-primary">Log In</router-link>
          </div>
          <div v-else class="d-flex align-items-center">
            <span class="navbar-text me-3">Welcome, {{ userStore.user.data?.email }}</span>
            <button @click="handleLogout" class="btn btn-outline-secondary">Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

// 将登出操作封装一下，以便未来扩展
const handleLogout = () => {
  userStore.logout();
}
</script>

<style scoped>
.nav-link {
  font-weight: 700;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem; 
  border-bottom: 3px solid transparent;
}

.nav-link.router-link-exact-active {
  color: var(--primary-color) !important;
  border-bottom-color: var(--primary-color);
}

.nav-link:not(.router-link-exact-active):hover {
    color: var(--primary-hover-color);
}
</style>