<template>
  <footer class="bg-dark pt-5 pb-4 mt-auto">
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
          <p><router-link to="/knowledge-hub">Knowledge Hub</router-link></p>
          <p><router-link to="/community">Community</router-link></p>
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold">Contact</h6>
           <hr class="mb-4 mt-0 d-inline-block mx-auto" :style="{ backgroundColor: 'var(--primary-hover-color)', height: '2px', width: '60px', border: 'none' }"/>
          <p>Singapore</p>
          <p>contact@formentalhealth.org</p>
        </div>
      </div>
    </div>
     <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2025 Copyright: For Mental Health. Current time in Singapore is {{currentTime}}.
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentTime = ref('');

const updateTime = () => {
    currentTime.value = new Intl.DateTimeFormat('en-SG', {
        timeZone: 'Asia/Singapore',
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
    setInterval(updateTime, 1000);
});
</script>