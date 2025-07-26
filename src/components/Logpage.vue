<template>
  <div class="card p-4 mx-auto" style="max-width: 400px;">
    <h3 class="text-center mb-4">Login</h3>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">Log In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();

const handleLogin = () => {
  userStore.login(email.value, password.value);
  
  // *** 变化在这里 ***
  // 登录后，直接跳转到 community 页面，而不是首页。
  router.push('/community'); 
};
</script>