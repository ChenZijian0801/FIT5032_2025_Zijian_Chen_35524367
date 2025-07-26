<template>
  <div class="container my-5">
    <Logpage />
    <div class="text-center mt-3">
      <p>Don't have an account? <router-link to="/register">Create one now</router-link></p>
    </div>
  </div>
</template>

<script setup>
import Logpage from '@/components/Logpage.vue';
</script>