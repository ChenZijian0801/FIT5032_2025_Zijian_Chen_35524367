<template>
  <footer class="bg-dark text-white pt-5 pb-4 mt-auto">
    <div class="container text-center text-md-start">
      <div class="row">
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold">For Mental Health</h6>
          <hr class="mb-4 mt-0 d-inline-block mx-auto" :style="{ backgroundColor: 'var(--primary-hover-color)', height: '2px', width: '60px', border: 'none' }"/>
          <p>
            Providing accessible, equitable, and effective mental health support for everyone.
          </p>
        </div>

        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold">Resources</h6>
           <hr class="mb-4 mt-0 d-inline-block mx-auto" :style="{ backgroundColor: 'var(--primary-hover-color)', height: '2px', width: '60px', border: 'none' }"/>
          <p><router-link to="/knowledge-hub" class="text-white text-decoration-none">Knowledge Hub</router-link></p>
          <p><router-link to="/community" class="text-white text-decoration-none">Community</router-link></p>
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold">Contact</h6>
           <hr class="mb-4 mt-0 d-inline-block mx-auto" :style="{ backgroundColor: 'var(--primary-hover-color)', height: '2px', width: '60px', border: 'none' }"/>
          <p>Suzhou</p>
          <p><router-link to="/contact" class="text-white text-decoration-none">contact@formentalhealth.org</router-link></p>
        </div>
      </div>
    </div>
     <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2025 Copyright: For Mental Health. Current time in Suzhou is {{currentTime}}.
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
let timer = null;

const updateTime = () => {
    currentTime.value = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Shanghai', // Suzhou's time zone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(new Date());
};

onMounted(() => {
    updateTime();
    timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
});
</script>