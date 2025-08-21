<template>
  <div class="container mt-4">
    <h1 class="mb-4">Admin Dashboard</h1>

    <div class="card mb-5">
      <div class="card-header">
        User Registration Trends
      </div>
      <div class="card-body" style="height: 400px;">
        <Bar v-if="chartData.labels && chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
        <div v-else class="d-flex align-items-center justify-content-center h-100 text-muted">
          <div class="spinner-border spinner-border-sm me-2" role="status"></div>
          <span>Loading chart data...</span>
        </div>
      </div>
    </div>
    
    <h2 class="mb-4">User Management</h2>
    
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
    
    <nav v-if="totalPages > 1" class="mt-4">
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
import { ref, computed, onMounted } from 'vue';
import Papa from 'papaparse';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import mockUsers from '@/assets/mock_users.json';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const users = ref([]);
const searchTerm = ref('');
const sortKey = ref('first_name');
const sortOrder = ref(1);
const currentPage = ref(1);
const itemsPerPage = 10;
const chartData = ref({
  labels: [],
  datasets: []
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

onMounted(() => {
  // *** 变化在这里：我们在加载数据时，自动修正错误的键名 ***
  const normalizedUsers = mockUsers.map(user => {
    // 创建一个新对象，包含所有原有属性
    const newUser = { ...user };
    // 如果存在带空格的错误键名，就把它赋值给正确的不带空格的键名
    if (newUser.hasOwnProperty(' date_joined')) {
      newUser.date_joined = newUser[' date_joined'];
      // （可选）可以删除错误的键名
      // delete newUser[' date_joined'];
    }
    return newUser;
  });

  users.value = normalizedUsers;
  processChartData();
});

function processChartData() {
  const countsByMonth = {};
  for (const user of users.value) {
    if (user.date_joined) { // 现在这个判断可以正常工作了
      const month = new Date(user.date_joined).toLocaleString('en-US', { month: 'long', year: 'numeric' });
      countsByMonth[month] = (countsByMonth[month] || 0) + 1;
    }
  }
  const labels = Object.keys(countsByMonth).sort((a,b) => new Date(a) - new Date(b));
  const data = labels.map(label => countsByMonth[label]);
  chartData.value = {
    labels,
    datasets: [{
      label: 'User Registrations',
      backgroundColor: '#3E8A86',
      data
    }]
  };
}

const filteredAndSortedData = computed(() => {
  let data = [...users.value];
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

function exportDataToCSV() {
  const dataToExport = filteredAndSortedData.value;
  if (dataToExport.length === 0) {
    alert('No data to export.');
    return;
  }
  const csv = Papa.unparse(dataToExport);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `users_export_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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