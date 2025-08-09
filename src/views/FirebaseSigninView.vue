<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <select v-model="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
      <option value="librarian">Librarian</option>
    </select>
  </p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const role = ref("user"); // Default role
const router = useRouter();
const auth = getAuth();

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Firebase Login Successful!");
      console.log("Selected role:", role.value);

      // Redirect based on the selected role
      switch(role.value) {
        case 'admin':
          router.push("/admin");
          break;
        case 'librarian':
          router.push("/librarian");
          break;
        default: // Default to user or home page
          router.push("/");
      }
    }).catch((error) => {
      console.log(error.code);
    });
};
</script>