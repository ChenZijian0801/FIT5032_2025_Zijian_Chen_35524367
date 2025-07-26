<template>
  <div class="container my-5">
    <RegisterForm />
    <div class="text-center mt-3">
      <p>Already have an account? <router-link to="/login">Log in here</router-link></p>
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '@/components/RegisterForm.vue';
</script>