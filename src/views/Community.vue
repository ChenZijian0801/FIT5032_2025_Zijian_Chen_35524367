
<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Communities</h1>
      <button 
        v-if="userStore.user.isLoggedIn" 
        class="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#createCommunityModal"
        @click="checkAdminPermission"
      >
        <i class="bi bi-plus-circle me-2"></i>Create Community
      </button>
    </div>

    <div class="alert alert-info" v-if="!userStore.user.isLoggedIn">
      Please <router-link to="/login">log in</router-link> to join the communities and create your own.
    </div>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="community in communities" :key="community.id">
        <div class="card h-100 shadow-sm">
          <img :src="community.img" class="card-img-top" :alt="community.title">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ community.title }}</h5>
            <p class="card-text flex-grow-1">{{ community.description }}</p>
          </div>
          <div class="card-footer bg-transparent border-0 p-3 d-flex justify-content-between align-items-center">
            <a href="#" class="btn btn-outline-secondary">Join</a>
            <button 
              v-if="community.isOwner" 
              @click="deleteCommunity(community.id)" 
              class="btn btn-outline-danger btn-sm"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <CreateCommunityModal 
      modalId="createCommunityModal" 
      @community-created="addNewCommunity" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import CreateCommunityModal from '@/components/CreateCommunityModal.vue';

const userStore = useUserStore();

// *** 变化在这里：创建了新的权限检查函数 ***
const checkAdminPermission = (event) => {
  // 检查用户角色是否不是 'admin'
  if (userStore.user.role !== 'admin') {
    // 如果不是管理员，阻止 Bootstrap 默认的打开弹窗行为
    event.preventDefault();
    // 并给出提示
    alert('Access Denied: Only administrators can create new communities.');
  }
  // 如果是管理员，则什么也不做，让 Bootstrap 的 data-* 属性正常工作
};

const communities = ref([
  {
    id: 1,
    title: 'Communities of African descent',
    description: 'A supportive space for people of African descent to share and connect.',
    img: 'black-african-american-communities-1024x462.webp',
    isOwner: false
  },
  {
    id: 2,
    title: 'Students Mental Health Support',
    description: 'A community for students to discuss academic stress and mental wellness.',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    isOwner: false
  },
  {
    id: 3,
    title: 'New Parents Peer Group',
    description: 'Share the joys and challenges of parenthood with fellow new parents.',
    img: 'self-care-for-parents-2-1200x800.png',
    isOwner: false
  }
]);

const addNewCommunity = (newCommunity) => {
  communities.value.unshift(newCommunity);
  // 现在我们不再需要用JS来手动关闭模态框了，Bootstrap会自己处理
};

const deleteCommunity = (communityIdToDelete) => {
  if (confirm('Are you sure you want to delete this community? This action cannot be undone.')) {
    communities.value = communities.value.filter(community => community.id !== communityIdToDelete);
  }
};
</script>

<style>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>