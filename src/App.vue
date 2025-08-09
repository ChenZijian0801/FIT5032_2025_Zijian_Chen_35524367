<script setup>
<<<<<<< HEAD

import BHeader from './components/BHeader.vue' 
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <BHeader />
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
=======
import JSON from './components/JSON.vue'; 
import Form from "./components/Form.vue";
</script>

<template>
 
   
  <Form/>
>>>>>>> 1a06f5027117fb439b709548846240d75310e8b7
</template>

<style>

<<<<<<< HEAD
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5; 
  color: #333;
}


.app-container {
  max-width: 1100px; 
  margin: 2rem auto; 
  padding: 1.5rem;
  background-color: #ffffff; 
  border-radius: 12px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); 
}


.app-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef; 
  margin-bottom: 1.5rem; 
}

=======
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; 
}
>>>>>>> 1a06f5027117fb439b709548846240d75310e8b7
</style>