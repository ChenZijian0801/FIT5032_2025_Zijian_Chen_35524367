<template>
  <div class="container mt-4">
    <div class="text-center mb-4">
      <h1>Find Support Near You</h1>
      <p class="lead text-muted">Discover resources and support centers in your area.</p>
    </div>
    
    <div id="map" class="shadow rounded" style="height: 500px; width: 100%;"></div>
    
    <div class="text-center mt-3">
        <button @click="findMe" class="btn btn-primary">
            <i class="bi bi-geo-alt-fill me-2"></i>Find My Location
        </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
// 导入 Leaflet 的 CSS 和 JS
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let map = null;

onMounted(() => {
  // 初始化地图，中心点设置为苏州
  map = L.map('map').setView([31.299, 120.585], 12); 
  
  // 添加地图瓦片图层 (来自 OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // 功能1: 添加一个固定的示例标记，并使用新名字
  L.marker([31.318, 120.613]).addTo(map)
    .bindPopup('<b>Suzhou Wellness & Counseling Center</b><br>Your local partner in mental health.')
    .openPopup();
});

// 功能2: 获取用户当前位置
function findMe() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      // 将地图视图移动到用户当前位置
      map.setView([lat, lng], 15);
      // 在用户位置添加一个标记
      L.marker([lat, lng]).addTo(map).bindPopup('<b>You are here!</b>').openPopup();
    }, () => {
        alert('Unable to retrieve your location. Please ensure you have granted permission.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// 在组件被卸载时，清理地图实例以防内存泄漏
onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>