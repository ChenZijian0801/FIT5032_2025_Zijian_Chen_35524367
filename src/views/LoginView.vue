<script setup>
import { ref } from 'vue'
import { useAuth } from '../auth' // Import our auth logic

// Local state for the form inputs
const username = ref('')
const password = ref('')

// Get the login function from our auth store
const { login } = useAuth()

// Method to handle form submission
const handleLogin = () => {
  login(username.value, password.value)
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Member Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required 
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
.input-group {
  margin-bottom: 1rem;
}
.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding doesn't affect width */
}
.login-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #0d6efd;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.login-button:hover {
  background-color: #0b5ed7;
}
</style>