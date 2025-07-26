<template>
  <div class="card p-4 mx-auto" style="max-width: 500px;">
    <h3 class="text-center mb-4">Create Your Account</h3>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
         <div v-if="passwordError" class="form-text text-danger">{{ passwordError }}</div>
      </div>
       <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');

const userStore = useUserStore();
const router = useRouter();

const handleRegister = () => {
  passwordError.value = '';
  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match.';
    return;
  }
  
  // 确认这里调用的是 userStore.register，并将 name.value 传入
  userStore.register(name.value, email.value, password.value);
  
  // 注册后跳转到首页
  router.push('/');
};
</script>