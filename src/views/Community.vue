<template>
  <div class="container mt-4">
    <h1 class="mb-4">Communities</h1>
    <div class="alert alert-info" v-if="!userStore.user.isLoggedIn">
      Please <router-link to="/login">log in</router-link> to join the communities and create your own.
    </div>

    <div class="text-center my-4" v-if="userStore.user.role === 'member' || userStore.user.role === 'admin'">
        <button class="btn btn-primary btn-lg">Create your own community</button>
        <p class="mt-2 text-muted">This button is only visible to logged-in members.</p>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card p-3">
                <img src="https://via.placeholder.com/400x200" class="card-img-top" alt="Community">
                <div class="card-body">
                    <h5 class="card-title">Communities of African descent</h5>
                    <p class="card-text">A supportive space for people of African descent to share and connect.</p>
                    <a href="#" class="btn btn-secondary">Join</a>
                </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
</script>