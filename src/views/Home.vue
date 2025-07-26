<template>
  <div>
    <div class="hero-section p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold">Your Safe Space for Mental Wellness</h1>
            <p class="fs-4">Find support, resources, and community. You are not alone.</p>
            <router-link :to="userStore.user.isLoggedIn ? '/community' : '/register'" class="btn btn-primary btn-lg mt-3">
              Join Our Community
            </router-link>
          </div>
          <div class="col-lg-6">
            <img :src="heroImage" class="img-fluid rounded-3 shadow-lg" alt="Mental Health Concept">
          </div>
        </div>
      </div>
    </div>

    <div class="row text-center g-4">
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Learn & Understand</h5>
            <p class="card-text flex-grow-1">Explore our Knowledge Hub for reliable information on mental health conditions.</p>
            <router-link to="/knowledge-hub" class="btn btn-outline-secondary">Explore Hub</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Community & Support</h5>
            <p class="card-text flex-grow-1">Connect with peers who understand what you're going through. Share and listen.</p>
            <router-link to="/community" class="btn btn-outline-secondary">Find a Community</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Self-Help Tools</h5>
            <p class="card-text flex-grow-1">Access interactive tools and exercises to manage your well-being.</p>
            <a href="#" class="btn btn-outline-secondary disabled">Coming Soon</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import heroImage from '@/assets/images/hero-image.jpg';

const userStore = useUserStore();
</script>

<style scoped>
/* 使用在 base.css 中定义的 CSS 变量 */
.hero-section {
  background-color: var(--subtle-bg-color);
}
</style>