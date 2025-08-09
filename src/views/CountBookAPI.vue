<template>
  <div class="container mt-4">
    <div class="card p-4">
      <h3 class="card-title text-center">JSON Data Display</h3>
      <div v-if="loading" class="text-center mt-3">Loading data...</div>
      <div v-else-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-else class="api-response mt-3 p-3 border rounded bg-light">
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(true)
const error = ref(null)
const authorsCount = ref(0)
const totalBooks = ref(0)
const apiResponse = ref(null)

const calculateStats = () => {
  authorsCount.value = authors.value ? authors.value.length : 0;
  
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + (author.famousWorks ? author.famousWorks.length : 0);
  }, 0);
}

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    // 路径修正：从 public 目录加载文件
    const response = await fetch('/authors.json') 

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    authors.value = data
    calculateStats()

    apiResponse.value = {
      success: true,
      message: 'JSON data successfully loaded.',
      authorsCount: authorsCount.value,
      totalBooks: totalBooks.value,
      authors: authors.value.map(author => ({
        name: author.name,
        bookCount: author.famousWorks ? author.famousWorks.length : 0, 
      })),
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = err.message
    apiResponse.value = {
      success: false,
      message: `Error loading authors data: ${err.message}`
    }
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})
</script>

<style scoped>
.api-response {
  white-space: pre-wrap;
  font-family: monospace;
  max-height: 500px;
  overflow-y: auto;
}
</style>