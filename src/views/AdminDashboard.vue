<template>
  <div class="container mt-4">
    <h1 class="mb-4">User Management Dashboard</h1>
    
    <div class="d-flex justify-content-between mb-3">
      <input type="text" class="form-control me-3" placeholder="Search by name or email..." v-model="searchTerm">
      <button @click="exportDataToCSV" class="btn btn-success text-nowrap">
        <i class="bi bi-download me-2"></i>Export as CSV
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th @click="sortBy('first_name')" class="cursor-pointer">First Name</th>
            <th @click="sortBy('last_name')" class="cursor-pointer">Last Name</th>
            <th @click="sortBy('email')" class="cursor-pointer">Email</th>
            <th @click="sortBy('date_joined')" class="cursor-pointer">Date Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedData.length === 0">
            <td colspan="4" class="text-center text-muted">No users found.</td>
          </tr>
          <tr v-for="user in paginatedData" :key="user.id">
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.date_joined }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': currentPage === 1}">
          <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{'active': page === currentPage}">
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': currentPage === totalPages}">
          <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import users from '@/assets/mock_users.json';
// *** 变化在这里 (2/2)：导入 Papa Parse ***
import Papa from 'papaparse';

const searchTerm = ref('');
const sortKey = ref('first_name');
const sortOrder = ref(1);
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredAndSortedData = computed(() => {
  let data = [...users];
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    data = data.filter(user => 
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }
  data.sort((a, b) => {
    let valA = a[sortKey.value];
    let valB = b[sortKey.value];
    if (valA < valB) return -1 * sortOrder.value;
    if (valA > valB) return 1 * sortOrder.value;
    return 0;
  });
  return data;
});

const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedData.value.length / itemsPerPage);
});

const paginatedData = computed(() => {
  if (filteredAndSortedData.value.length === 0) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAndSortedData.value.slice(start, end);
});

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
}

// *** 变化在这里 (2/2)：新增导出数据到 CSV 的函数 ***
function exportDataToCSV() {
  // 我们将导出当前经过筛选和排序后的 *所有* 数据，而不仅仅是当前页
  const dataToExport = filteredAndSortedData.value;

  if (dataToExport.length === 0) {
    alert('No data to export.');
    return;
  }

  // 使用 Papa Parse 将 JSON 数组转换为 CSV 字符串
  const csv = Papa.unparse(dataToExport);

  // 创建一个 Blob 对象
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // 创建一个临时的 a 标签用于下载
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  // 设置下载文件的名称，包含当天的日期
  link.setAttribute('download', `users_export_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  
  // 将 a 标签添加到页面，模拟点击，然后移除
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // 释放 URL 对象
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.table-responsive {
  min-height: 500px;
}
</style>