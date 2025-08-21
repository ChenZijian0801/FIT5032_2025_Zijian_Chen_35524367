// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-kGaKsFsCiXn8SWU6PSinkfZPKQGvTcU",
  authDomain: "assignment3-8b120.firebaseapp.com",
  projectId: "assignment3-8b120",
  storageBucket: "assignment3-8b120.firebasestorage.app",
  messagingSenderId: "16696478773",
  appId: "1:16696478773:web:f2200111e0725aeeb7357c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);