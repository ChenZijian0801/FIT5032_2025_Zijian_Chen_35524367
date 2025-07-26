<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="createCommunityModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createCommunityModalLabel">Create a New Community</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleCreate">
            <div class="mb-3">
              <label for="community-name" class="form-label">Community Name</label>
              <input type="text" class="form-control" id="community-name" v-model="name" required>
            </div>
            
            <div class="mb-3">
              <label for="community-description" class="form-label">Description</label>
              <textarea class="form-control" id="community-description" rows="3" v-model="description" required></textarea>
            </div>
            
            <div class="mb-3">
              <label for="community-image-file" class="form-label">Community Image</label>
              <input type="file" class="form-control" id="community-image-file" @change="handleFileSelect" accept="image/*">
            </div>

            <div v-if="imagePreviewUrl" class="mb-3 text-center">
              <p>Image Preview:</p>
              <img :src="imagePreviewUrl" class="img-fluid rounded" style="max-height: 200px;" alt="Image preview">
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create Community</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modalId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['community-created']);

// 表单数据
const name = ref('');
const description = ref('');
const imagePreviewUrl = ref(null); // 用于存储图片预览的临时URL
let selectedFile = null; // 用于存储实际的文件对象

// *** 新增文件选择处理函数 ***
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file;
    // 使用 FileReader API 创建一个临时的URL用于预览
    imagePreviewUrl.value = URL.createObjectURL(file);
  } else {
    selectedFile = null;
    imagePreviewUrl.value = null;
  }
};


const handleCreate = () => {
  if (!name.value || !description.value) {
    alert('Please fill out all fields.');
    return;
  }

  // 在真实应用中，这里会先上传 selectedFile 到服务器，然后用服务器返回的永久URL
  // 在我们的模拟中，我们直接使用临时的预览URL
  const finalImageUrl = imagePreviewUrl.value || `https://via.placeholder.com/400x200?text=${name.value.replace(/\s/g, '+')}`;

  emit('community-created', {
    id: Date.now(),
    title: name.value,
    description: description.value,
    img: finalImageUrl,
    isOwner: true
  });

  // 清空表单和预览
  name.value = '';
  description.value = '';
  imagePreviewUrl.value = null;
  selectedFile = null;
  // 重置文件输入框
  document.getElementById('community-image-file').value = '';
};
</script>