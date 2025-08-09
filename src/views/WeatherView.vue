<template>
  <div class="weather-app container mt-4 p-4 card">
    <h3 class="card-title text-center mb-4">Weather App</h3>
    
    <div class="row g-3 justify-content-center">
      <div class="col-md-6">
        <label for="city-input" class="form-label">Enter City Name:</label>
        <input 
          type="text" 
          id="city-input" 
          class="form-control" 
          v-model="city" 
          @keyup.enter="fetchWeather" 
          placeholder="e.g., London, Paris, Tokyo">
      </div>
      <div class="col-md-auto d-flex align-items-end">
        <button @click="fetchWeather" class="btn btn-primary w-100">Get Weather</button>
      </div>
    </div>

    <div v-if="loading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading weather data...</p>
    </div>

    <div v-if="error" class="alert alert-danger mt-4">{{ error }}</div>

    <div v-if="weather" class="weather-results mt-4 p-3 border rounded shadow-sm bg-light">
      <h4 class="mb-3">{{ weather.name }} ({{ weather.sys.country }})</h4>
      <div class="d-flex align-items-center mb-3">
        <img :src="iconUrl" :alt="weather.weather[0].description" class="weather-icon me-3">
        <div>
          <p class="h1 mb-0">{{ weather.main.temp }}°C</p>
          <p class="text-muted text-capitalize">{{ weather.weather[0].description }}</p>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-4">
          <strong>Humidity:</strong><br>
          {{ weather.main.humidity }}%
        </div>
        <div class="col-4">
          <strong>Wind Speed:</strong><br>
          {{ weather.wind.speed }} m/s
        </div>
        <div class="col-4">
          <strong>Pressure:</strong><br>
          {{ weather.main.pressure }} hPa
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const API_KEY = 'da0733d6b489c61a0bb7d48829203b62';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const city = ref('');
const weather = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchWeather = async () => {
  if (!city.value) {
    error.value = 'Please enter a city name.';
    weather.value = null;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`${BASE_URL}?q=${city.value}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please enter a valid city.');
      }
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
    
    const data = await response.json();
    weather.value = data;
    console.log('Weather data received:', data);
  } catch (err) {
    error.value = err.message;
    weather.value = null;
    console.error('API call failed:', err);
  } finally {
    loading.value = false;
  }
};

const iconUrl = computed(() => {
  if (weather.value && weather.value.weather[0].icon) {
    return `https://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png`;
  }
  return '';
});
</script>

<style scoped>
.weather-app {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.weather-icon {
  width: 80px;
  height: 80px;
}
</style>