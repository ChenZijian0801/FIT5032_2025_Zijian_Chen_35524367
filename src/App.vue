<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />

    <div v-if="!isOnline" class="alert alert-warning text-center mb-0 rounded-0" role="alert">
      You are currently offline. Some features may be unavailable.
    </div>

    <main class="main-container container flex-grow-1 py-4">
      <router-view></router-view>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/common/AppHeader.vue';
import AppFooter from './components/common/AppFooter.vue';
import { useNetworkStatus } from './composables/useNetworkStatus';

const { isOnline } = useNetworkStatus();
</script>

<style>
/* 确保 App 占满整个视口高度，并将页脚推到底部 */
.min-vh-100 {
  min-height: 100vh;
}
.flex-grow-1 {
  flex-grow: 1;
}
</style>