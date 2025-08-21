<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />
    <main class="main-container container flex-grow-1 py-4">
      <router-view></router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
</script>

<style>

.min-vh-100 {
  min-height: 100vh;
}
.flex-grow-1 {
  flex-grow: 1;
}
</style>