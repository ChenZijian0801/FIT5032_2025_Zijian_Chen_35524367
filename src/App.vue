<script setup>

import BHeader from './components/BHeader.vue' 
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <BHeader />
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5; 
  color: #333;
}


.app-container {
  max-width: 1100px; 
  margin: 2rem auto; 
  padding: 1.5rem;
  background-color: #ffffff; 
  border-radius: 12px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); 
}


.app-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef; 
  margin-bottom: 1.5rem; 
}

</style>