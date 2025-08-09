<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '../auth'
import { useRouter } from 'vue-router';

const { isAuthenticated, currentUser, logout } = useAuth()
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push('/FireLogin');
};
</script>

<template>
  <nav class="navigation-header">
    <div class="nav-links">
      <RouterLink to="/" active-class="active">Home</RouterLink>
      <RouterLink to="/weather">Get Weather</RouterLink>
      <RouterLink to="/CountBookAPI" active-class="active">Count Book API</RouterLink>

      <RouterLink v-if="isAuthenticated" to="/about" active-class="active">About</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/add-book" active-class="active">Add Book</RouterLink>
    </div>

    <div class="nav-auth">
      <span v-if="isAuthenticated" class="user-info me-2">
        欢迎, {{ currentUser?.email }}
      </span>
      <button v-if="isAuthenticated" @click="handleLogout" class="auth-button">
        Logout
      </button>

      <template v-else>
        <RouterLink to="/FireLogin" class="auth-button me-2">Firebase Login</RouterLink>
        <RouterLink to="/FireRegister" class="auth-button">Firebase Register</RouterLink>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navigation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem; /* 增加链接间的间距 */
}

.nav-links a {
  font-weight: 500;
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s ease-in-out;
  position: relative;
}

.nav-links a:hover {
  color: #0d6efd;
}

/* 优化后的 active 样式 */
.nav-links a.active {
  color: #0d6efd;
  font-weight: bold;
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0;
  height: 2px;
  background-color: #0d6efd;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  font-weight: 500;
  color: #555;
}

.auth-button {
  display: inline-block;
  border: 1px solid #0d6efd;
  background-color: #0d6efd;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.auth-button:hover {
  background-color: #0b5ed7;
  border-color: #0b5ed7;
}

button.auth-button {
  background-color: transparent;
  color: #0d6efd;
  border: 1px solid #0d6efd;
}

button.auth-button:hover {
  background-color: #e7f0fe;
  color: #0d6efd;
}
</style>